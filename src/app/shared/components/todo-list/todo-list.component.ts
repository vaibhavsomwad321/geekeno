import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../_services/todo.service';
import { Itodo } from '../../model/todoTask';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoForm!: FormGroup;
  todo: Itodo[] = [];
  inprogess: Itodo[] = [];
  done: Itodo[] = []

  updateBn: boolean = true;
  constructor(private fb: FormBuilder, private todoService: TodoService) { }
  ngOnInit(): void {
    this.createForm();
    this.getAllData()
  }
  createForm() {
    this.todoForm = this.fb.group({
      todoItem: ['', Validators.required]
    })
  }
  onSubmit() {
    let obj = {
      ...this.todoForm.value
    }
    this.todoForm.reset();
    this.todoService.post(obj).subscribe(res => {
      this.todo.push(res)
    })
  }

  getAllData() {
    this.todoService.get().subscribe((res: Itodo[]) => {
      this.todo = res
    })
  }

  onDelete(id: number) {
    this.todoService.delete(id).subscribe(res => {
      this.todo = this.todo.filter(d => d.id != id)
      this.inprogess = this.inprogess.filter(d => d.id != id)
      this.done = this.done.filter(d => d.id != id)
    })
  }

  onEidt(id: number) {
    localStorage.setItem("postId", "" + id)
    this.updateBn = false;
    this.todoService.get(id).subscribe((res:any) => {
      this.todoForm.setValue({
        todoItem: res.todoItem
      })
      console.log(res)
    })
  }
  onUpdate() {
    let getId = +localStorage.getItem('postId')!;
    this.todoService.patch(getId, this.todoForm.value).subscribe(res => {
      this.todo.forEach(ele => {
        if (ele.id === getId) {
          ele.todoItem = res.todoItem
        }
      })
    })
    this.todoForm.reset();
    this.updateBn = true
  }


  drop(event: CdkDragDrop<Itodo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}


