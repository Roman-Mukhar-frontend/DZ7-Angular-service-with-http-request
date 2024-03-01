import { Component, OnInit } from '@angular/core';
import { IBlog, IBlogResponse } from 'src/app/shared/interfaces/blog/blog.interface';
import { BlogService } from 'src/app/shared/services/blog/blog.service';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.scss']
})
export class AdminBlogsComponent implements OnInit {

  public adminBlogsArr!: IBlog[];
  public title!: string;
  public text!: string;
  public author!: string;
  public imagePath = 'https://www.bmw.ua/uk/index/_jcr_content/root/maincontent/contentblueprint/contentblueprint_cop/image.coreimg.jpeg/1703846420969/teser-trade-in-hometeaser.jpeg';
  public editStatus = false;
  public editID!: number;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getAll().subscribe(data => {
      this.adminBlogsArr = data;
    })
  }

  addNewBlog(): void {
    const newBlog = {
      title: this.title,
      text: this.text,
      author: this.author,
      imagePath: this.imagePath
    }
    this.blogService.createNewBlog(newBlog).subscribe(() => {
      this.getBlogs();
      this.resetForms();

    })
  }
  editBlog(blog: IBlog): void {
    this.editStatus = true;
    this.title = blog.title;
    this.text = blog.text;
    this.author = blog.author;
    this.imagePath = blog.imagePath;
    this.editID = blog.id;
  };

  saveEditBlog(): void {
    const updateBlog = {
      title:  this.title,
      text: this.text,
      author: this.author,
      imagePath: this.imagePath
    };
    this.blogService.updateBlog(updateBlog, this.editID).subscribe(() => {
      this.getBlogs();
      this.resetForms();
    })
  }


  deleteBlog(blog: IBlog): void {
    if(confirm (`Do you want to delete post number ${blog.id}?`)){
      this.blogService.deleteBlog(blog.id).subscribe(() => {
        this.getBlogs();
      })
    }
  }

  resetForms(): void {
    this.title = '';
    this.text = '';
    this.author = '';
    this.editStatus = false;
  }

}
