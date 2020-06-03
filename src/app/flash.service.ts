import { Injectable, ViewChild } from '@angular/core';
import { IFlash } from './flash.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FlashService {
  @ViewChild('flashForm', { static: false }) flashForm: NgForm;

  getRandomNumber() {
    return Math.floor(Math.random() * 10000);
  }

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

  addFlash(flash: IFlash) {
    this.flashs.push({
      ...flash,
      show: false,
      id: this.getRandomNumber(),
    });
  }

  getFlash(id: number) {
    const flash = this.flashs.find(flash => flash.id === id);
    return flash;
  }


  updateFlash(id, updatedFlash: IFlash) {
    const flash = this.flashs.find(flash => flash.id === id);
    flash.question = updatedFlash.question;
    flash.answer = updatedFlash.answer;
  }

  deleteFlash(id) {
    const flashId = this.flashs.findIndex(flash => flash.id === id);
    this.flashs.splice(flashId, 1);
  }

  rememberedChange(id: number, flag) {
    const flash = this.flashs.find(flash => flash.id === id);
    flash.remembered = flag;
  }

  toggleFlash(id: number) {
    const flash = this.flashs.find(flash => flash.id === id);
    flash.show = !flash.show;
  }
  constructor() { }
}
