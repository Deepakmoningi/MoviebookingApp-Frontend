import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MoviesService } from 'src/services/movies.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  moviesList:any=[];
  searchMovie:string="";
  constructor(public service:UserService,private movieService:MoviesService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getMovies();
    //this.service.status();
  }

  // getting all movies
  getMovies(){
    this.movieService.getAllMovies()
    .subscribe({
      next:(data)=>{
        this.moviesList=data;
      }
    }
     )
  }

  // getting movies by name 
  findMovieBySearch(searchMovie:any){
    this.movieService.getMovieByName(searchMovie)
    .subscribe({
      next: (data)=>{
        this.moviesList=data;
      }
    })
  }
  
  // booking tickets
  bookTickectsNavigation(movie:any){
    const data={
      movieName:movie.movieName,
      theatreName:movie.theatreName
    }
    this.router.navigate(['/ticketbooking'],{queryParams:data});
  }

  // deleting a movie (only for admin)
  deleteMovie(movie:any){
    let result=confirm("Are you sure want to delete?");
    if(result){
      this.movieService.deleteMovie(movie.movieName,movie.theatreName)
      .subscribe({
       next: (res:any)=>{
          this.toastr.success(res.message)
          this.getMovies();
        },
        // error:(err)=>{
        //   this.toastr.success("Deleted Successfully.")
        //   this.router.navigateByUrl('/movies');
        // }
        })
    }
  }

}
