import { Component, ViewChild } from '@angular/core';
import { IFlash } from './flash.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  @ViewChild('flashForm', { static: false }) flashForm: NgForm;

  flash = {
    question: '',
    answer: ''
  };

  flashs: IFlash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: false,
    id: this.getRandomNumber(),
  }, {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: this.getRandomNumber(),
  }, {
    question: 'Question 3',
    answer: 'Answer 3',
    show: false,
    id: this.getRandomNumber(),
  }];

  editing = false;
  editingId: number;


  getRandomNumber() {
    return Math.floor(Math.random() * 10000);
  }

  trackByFlashId(index, flash) {
    return flash.id;
  }

  handleToggleCard(id: number) {
    const flash = this.flashs.find(flash => flash.id === id);
    flash.show = !flash.show;
  }

  handleDelete(id: number) {
    const flashId = this.flashs.findIndex(flash => flash.id === id);
    this.flashs.splice(flashId, 1);

  }

  handleEdit(id: number) {
    this.editing = true;
    this.editingId = id;
    // TODO: We will add editing logic after adding the form
  }

  handleRememeberedChange({ id, flag }) {
    const flash = this.flashs.find(flash => flash.id === id);
    flash.remembered = flag;
  }

  handleSubmit(): void {
    this.flashs.push({
      id: this.getRandomNumber(),
      ...this.flash,
    });
    this.handleClear();

    console.log(this.flashs);
  }


  handleClear() {
    this.flash = {
      question: '',
      answer: '',
    };
    this.flashForm.reset();
  }

  handleEdit(id: number): void {
    this.editing = true;
    this.editingId = id;
    const flash = this.flashs.find(flash => flash.id === id);
    this.flash.question = flash.question;
    this.flash.answer = flash.answer;
  }

  handleUpdate() {
    const flash = this.flashs.find(flash => flash.id === this.editingId);
    flash.question = this.flash.question;
    flash.answer = this.flash.answer;
    this.handleCancel();
  }
  handleCancel() {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }

}
