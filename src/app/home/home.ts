import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListTask } from '../TaskList';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  titleValue: string = '';
  priorityValue: string = 'Medium';
  dateValue: string = new Date().toString();
  descValue: string = '';
  tasksList: ListTask[] = [];
  inProgressList: ListTask[] = [];
  doneList: ListTask[] = [];
  isTitleInvalid: boolean = false;

  constructor() {
    this.tasksList = JSON.parse(localStorage.getItem('listOfTasks') || '[]');
    this.inProgressList = JSON.parse(localStorage.getItem('inProgressList') || '[]');
    this.doneList = JSON.parse(localStorage.getItem('doneList') || '[]');
  }

  getInputsValues(): void {
    if (!this.titleValue || this.titleValue.trim() === '') {
      this.isTitleInvalid = true;
      return;
    }

    this.isTitleInvalid = false;

    let newTask: ListTask = {
      titleValue: this.titleValue.trim(),
      priorityValue: this.priorityValue || 'Medium',
      dateValue: this.dateValue || new Date().toLocaleDateString(),
      descValue: this.descValue || '',
    };

    this.tasksList.push(newTask);

    this.saveToLocalStorage();

    this.clearForm();

    console.log('Task added successfully!');
  }

  editIndex: number = -1;
  currentListType: string = 'todo';

  editTask(index: number, listType: string): void {
    this.editIndex = index;
    this.currentListType = listType;

    let targetList = this.tasksList;
    if (listType === 'inprogress') targetList = this.inProgressList;
    else if (listType === 'done') targetList = this.doneList;

    this.titleValue = targetList[index].titleValue;
    this.priorityValue = targetList[index].priorityValue;
    this.dateValue = targetList[index].dateValue;
    this.descValue = targetList[index].descValue;
  }
  sendToInProgress(index: number, fromList: string = 'todo'): void {
    let sourceList;

    if (fromList === 'todo') {
      sourceList = this.tasksList;
    } else if (fromList === 'done') {
      sourceList = this.doneList;
    }

    if (sourceList) {
      this.inProgressList.push(sourceList[index]);
      sourceList.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  returnToToDo(index: number, fromList: string = 'inprogress'): void {
    let sourceList;

    if (fromList === 'inprogress') {
      sourceList = this.inProgressList;
    } else if (fromList === 'done') {
      sourceList = this.doneList;
    }

    if (sourceList) {
      this.tasksList.push(sourceList[index]);
      sourceList.splice(index, 1);

      this.saveToLocalStorage();
    }
  }

  sendToDone(index: number, fromList: string = 'inprogress'): void {
    let sourceList;

    if (fromList === 'todo') {
      sourceList = this.tasksList;
    } else if (fromList === 'inprogress') {
      sourceList = this.inProgressList;
    }

    if (sourceList) {
      this.doneList.push(sourceList[index]);
      sourceList.splice(index, 1);
      this.saveToLocalStorage();
    }
  }
  updateTask(): void {
    if (this.editIndex !== -1 && this.titleValue.trim() !== '') {

      this.isTitleInvalid = false;

      let newTaskData: ListTask = {
        titleValue: this.titleValue.trim(),
        priorityValue: this.priorityValue,
        dateValue: this.dateValue,
        descValue: this.descValue,
      };

      if (this.currentListType === 'todo') {
        this.tasksList[this.editIndex] = newTaskData;
      } else if (this.currentListType === 'inprogress') {
        this.inProgressList[this.editIndex] = newTaskData;
      } else if (this.currentListType === 'done') {
        this.doneList[this.editIndex] = newTaskData;
      }

      this.saveToLocalStorage();
      this.clearForm();

    } else {
      this.isTitleInvalid = true;
    }
  }

  deleteTask(index: number, listType: string): void {
    if (listType === 'todo') {
      this.tasksList.splice(index, 1);
    } else if (listType === 'inprogress') {
      this.inProgressList.splice(index, 1);
    } else if (listType === 'done') {
      this.doneList.splice(index, 1);
    }

    this.saveToLocalStorage();
  }

  saveToLocalStorage(): void {
    localStorage.setItem('listOfTasks', JSON.stringify(this.tasksList));
    localStorage.setItem('inProgressList', JSON.stringify(this.inProgressList));
    localStorage.setItem('doneList', JSON.stringify(this.doneList));
  }

  clearForm(): void {
    this.titleValue = '';
    this.priorityValue = '';
    this.dateValue = '';
    this.descValue = '';
    this.editIndex = -1;
    this.currentListType = 'todo';
  }
}
