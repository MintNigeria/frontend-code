import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraduatesService } from 'src/app/core/services/graduates/graduates.service';

@Component({
  selector: 'app-view-graduate-talent-search-profile',
  templateUrl: './view-graduate-talent-search-profile.component.html',
  styleUrls: ['./view-graduate-talent-search-profile.component.scss']
})
export class ViewGraduateTalentSearchProfileComponent implements OnInit {
  graduateId: any;
  profileDetails: any;

  constructor(
    private route: ActivatedRoute,
    private graduateService: GraduatesService
  ) { }

  ngOnInit(): void {
    this.graduateId = this.route.snapshot.params['id']
    this.graduateService.getTalentSearchProfile(this.graduateId).subscribe((res: any) => {
      this.profileDetails = res.payload;
    })
  }

  downloadFile(id: string) {
    this.graduateService.downloadTalentSearchDocuments(id).subscribe((res: any) => {
      console.log(res)
      const link = document.createElement('a');
        link.download = `${res.payload?.name}.pdf`;
        link.href = 'data:image/png;base64,' + res.payload?.path;
        link.click();
    })
  }

}
