import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { IPost } from 'src/interfaces/IPost';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts!: IPost[]

  constructor(private httpService: HttpService, private titleService: Title, private metaDataService: Meta) { }

  ngOnInit(): void {
    this.setMetaTags()
    this.titleService.setTitle('All Posts')
    this.httpService.getPosts().subscribe(res => {
      this.posts = res
    })
  }

  setMetaTags() {
    this.metaDataService.addTags([{
      name: 'tag1', content: 'value1'
    },
    {
      name: 'tag2', content: 'value2'
    },
    {
      name: 'tag3', content: 'value3'
    },
    {
      name: 'tag4', content: 'value4'
    }

    ])
  }
}
