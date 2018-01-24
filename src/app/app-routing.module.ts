import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';


const routes: Routes = [
    {
        path: ":theme", children: [
            { path: "welcome", component: WelcomeComponent },
            { path: "**", redirectTo: "welcome", pathMatch: 'full' }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
