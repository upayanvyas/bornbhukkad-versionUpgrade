import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { TokenStorageService } from './_services/token-storage.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PrimeNGConfig } from 'primeng/api';
import { VendorService } from './_services/vendor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showSalesBoard = false;
  username: string;
  storeType: string;
  modalRef: BsModalRef;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  vendorStatus: boolean = true;

  vendorSts = ''

  @ViewChild('childModal', { static: false }) childModal: ModalDirective;

  constructor(private tokenStorageService: TokenStorageService, private idle: Idle, private keepalive: Keepalive,
    private router: Router, private modalService: BsModalService, private primengConfig: PrimeNGConfig, private vendorService: VendorService) {
    this.primengConfig.ripple = true;
    // idle.setIdle(5);
    // idle.setTimeout(5);
    // idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // idle.onIdleEnd.subscribe(() => {
    //   this.idleState = 'No longer idle.'
    //   console.log(this.idleState);
    //   this.reset();
    // });

    // idle.onTimeout.subscribe(() => {
    //   this.childModal.hide();
    //   this.idleState = 'Timed out!';
    //   this.timedOut = true;
    //   console.log(this.idleState);
    //   this.router.navigate(['/']);
    // });

    // idle.onIdleStart.subscribe(() => {
    //   this.idleState = 'You\'ve gone idle!'
    //   console.log(this.idleState);
    //   this.childModal.show();
    // });

    // idle.onTimeoutWarning.subscribe((countdown) => {
    //   this.idleState = 'You will time out in ' + countdown + ' seconds!'
    //   console.log(this.idleState);
    //   if(countdown === 5) {
    //     // this.logout();
    //   }
    // });

    // this.reset();
  }

  onChangeStatus() {
    this.vendorService.updateStoreStatus(this.vendorStatus).subscribe((data) => {
      console.log(data)
      alert("Store Status Updated");
    });
  }


  reset() {
    this.idle.watch();
    this.timedOut = false;
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  stay() {
    this.childModal.hide();
    this.reset();
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(this.roles)
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showSalesBoard = this.roles.includes('ROLE_SALES');
      this.username = user.storeName.toUpperCase();
      this.storeType = user.storeType.toUpperCase();
      if (!this.roles.includes('ROLE_ADMIN')) {
        this.vendorService.getStoreStatus().subscribe(data => {
          let tmp = JSON.stringify(data);
          if (JSON.parse(tmp).status === "closed") {
            this.vendorStatus = false;
            this.vendorSts = 'CLOSED'
          } else {
            this.vendorSts = 'OPEN'
          }
        });
      }
    }
  }

  logout() {
    if (confirm("Are you sure, you want to logout?")) {
      this.tokenStorageService.signOut();
      window.location.reload();
    }
  }

  // navOpen=false;

  // NavBarOpen()
  // {
  //   this.navOpen=!this.navOpen
  // }

  toggleNavbar() {
    var x = document.getElementById("id_topnav");
    if (x.classList.contains('topnav')) {
      x.classList.replace('topnav', 'responsive')
      // x.classList.add('responsive')
      console.log('in if: ', x.className)
    } else {
      // x.classList.remove('responsive')
      x.classList.replace('responsive', 'topnav')
      console.log('in else: ', x.className)
    }
  }
}
