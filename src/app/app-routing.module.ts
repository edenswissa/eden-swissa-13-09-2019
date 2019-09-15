import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { HomeComponent } from './home/home.component';
import { FavoriteComponent } from './favorite/favorite.component';


const routes : Routes = [
    {path:'' ,redirectTo:'home', pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'favorites', component:FavoriteComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {

}