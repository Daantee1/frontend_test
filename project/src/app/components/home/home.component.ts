import { Component } from '@angular/core';
import { BlockOneComponent } from "../block-one/block-one.component";
import { BlockThreeComponent } from "../block-three/block-three.component";
import { BlockTwoComponent } from "../block-two/block-two.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [BlockOneComponent, BlockThreeComponent, BlockTwoComponent, FooterComponent]
})
export class HomeComponent {

}
