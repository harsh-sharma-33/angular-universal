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
  id: string | null = null

  post: IPost | null = null

  constructor(private route: ActivatedRoute, private httpService: HttpService, private titleService: Title, private metaDataService: Meta) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.httpService.getPost(this.id as string).subscribe((res) => {
      this.post = res
      this.setTitle()
    })
  }

  setTitle() {
    this.titleService.setTitle(this.post!.title)
  }

  setSocialMetaTags() {
    const title = this.post?.title;
    const description = this.post?.body.substring(0, 100);
    const imageUrl = "https://picsum.photos/200";
    const pageUrl = document.location.href;

    // // Open Graph Meta Tags
    this.metaDataService.updateTag({ property: 'og:title', content: title as string });
    this.metaDataService.updateTag({ property: 'og:description', content: description as string });
    this.metaDataService.updateTag({ property: 'og:image', content: imageUrl });
    this.metaDataService.updateTag({ property: 'og:url', content: pageUrl });
    this.metaDataService.updateTag({ property: 'og:type', content: 'website' });

    // // Twitter Card Meta Tags
    this.metaDataService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaDataService.updateTag({ name: 'twitter:title', content: title as string });
    this.metaDataService.updateTag({ name: 'twitter:description', content: description as string });
    this.metaDataService.updateTag({ name: 'twitter:image', content: imageUrl });
    this.metaDataService.updateTag({ name: 'twitter:url', content: pageUrl });

    // // LinkedIn Article Meta Tags
    this.metaDataService.updateTag({ property: 'article:published_time', content: 'Publication Date' });
    this.metaDataService.updateTag({ property: 'article:author', content: 'Author Name' });

    // // Pinterest Rich Pins Meta Tag
    this.metaDataService.updateTag({ name: 'pinterest-rich-pin', content: 'true' });
  }

}
