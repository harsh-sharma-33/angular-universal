import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { IPost } from 'src/interfaces/IPost';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: IPost | null = null
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Route data recieves the post form 'postGuard' Route resolver and uses it here
    this.route.data.subscribe((data: any) => {
      this.post = data.post
    })
  }
}
