import { inject } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { HttpService } from './http.service';
import { Meta, Title } from '@angular/platform-browser';
import { IPost } from 'src/interfaces/IPost';
import { firstValueFrom } from 'rxjs';


// Resolver function that hits the api for a single post and set the title and meta tags then the route is loaded
export const postGuard = async (route: any, state: RouterStateSnapshot) => {
  const httpService = inject(HttpService)
  const titleService = inject(Title)
  const metaDataService = inject(Meta)
  const id = route.params['id']
  const post = await firstValueFrom(httpService.getPost(id as string))
  if (post) {
    setSocialMetaTags(post, metaDataService)
    titleService.setTitle(post.title)
    return post
  }
  return null

};


/**
 * Function is responsible for setting up all the meta tags
 * @param post IPost
 * @param metaDataService Meta service instance provided by angular
 */
const setSocialMetaTags = (post: IPost, metaDataService: Meta) => {
  const title = post?.title;
  const description = post?.body.substring(0, 100);
  const imageUrl = "https://picsum.photos/200";

  // // Open Graph Meta Tags
  metaDataService.updateTag({ property: 'og:title', content: title as string });
  metaDataService.updateTag({ property: 'og:description', content: description as string });
  metaDataService.updateTag({ property: 'og:image', content: imageUrl });
  metaDataService.updateTag({ property: 'og:type', content: 'website' });

  // // Twitter Card Meta Tags
  metaDataService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  metaDataService.updateTag({ name: 'twitter:title', content: title as string });
  metaDataService.updateTag({ name: 'twitter:description', content: description as string });
  metaDataService.updateTag({ name: 'twitter:image', content: imageUrl });

  // // LinkedIn Article Meta Tags
  metaDataService.updateTag({ property: 'article:published_time', content: 'Publication Date' });
  metaDataService.updateTag({ property: 'article:author', content: 'Author Name' });

  // // Pinterest Rich Pins Meta Tag
  metaDataService.updateTag({ name: 'pinterest-rich-pin', content: 'true' });
}
