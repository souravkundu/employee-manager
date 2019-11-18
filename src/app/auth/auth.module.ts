import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        AuthRoutingModule
    ],
    exports: [
        AuthComponent,
        RouterModule
    ]
})
export class AuthModule {

}
