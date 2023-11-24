import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showSection(section: string) {
    document.querySelector('#'+ section)?.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'nearest' })

  }

}
