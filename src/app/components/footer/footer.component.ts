import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
               
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                
            },
            {
                label: 'Events',
                icon: 'pi pi-fw pi-calendar',
                
            },
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-power-off'
            }
        ];
    }
}