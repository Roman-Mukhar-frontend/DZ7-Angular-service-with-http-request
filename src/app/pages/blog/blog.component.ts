import { Component, OnInit } from '@angular/core';
import { IBlogResponse } from 'src/app/shared/interfaces/blog/blog.interface';
import { BlogService } from 'src/app/shared/services/blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public userBlogsArr: Array<IBlogResponse> = [];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getBlogs()
  }
  getBlogs(): void {
    this.blogService.getAll().subscribe(data => {
      this.userBlogsArr = data;
    })
  }

}
