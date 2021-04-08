import { TestBed, fakeAsync, ComponentFixture, tick} from '@angular/core/testing';
import { AppComponent, CashbookService } from './app.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {

  let cashbookServiceStub: any;
  let cashbookService: CashbookService;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let h1: HTMLElement;
  let total: HTMLElement;
  let amount: HTMLInputElement;
  let in_btn: HTMLElement;
  let out_btn: HTMLElement;

  beforeEach(async () => {

    cashbookServiceStub = {

    }

    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [ { provide: CashbookService, useValue: cashbookServiceStub } ],
      imports: [FormsModule]
    });

    cashbookService = TestBed.inject(CashbookService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    h1 = fixture.nativeElement.querySelector('h1');
    total = fixture.nativeElement.querySelector('.total');
    amount = fixture.nativeElement.querySelector('input#amount');
    in_btn = fixture.nativeElement.querySelector('button#in');
    out_btn = fixture.nativeElement.querySelector('button#out');

  });

  it('should display Ngx - My Cashbook', () => {
    fixture.detectChanges();
    expect(h1.textContent).toContain("Ngx - My Cashbook");
  });

  it('should display total', () => {
    fixture.detectChanges();
    expect(total.textContent).toBe(' Total : 80 ');
  });

  it('should have amount input', () => {
    amount.value = '100';
    amount.dispatchEvent(new Event('input'));
    expect(amount.value).toBe('100');
  });

  it('should create new entry for cashin', fakeAsync(() => {
    fixture.detectChanges();
    amount.value = '100';
    amount.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    in_btn.click();
    fixture.detectChanges();
    tick(5000);
    fixture.detectChanges();
    expect(total.textContent).toBe(' Total : 180 ');
  }));

  it('should create new entry for cashout', fakeAsync(() => {
    fixture.detectChanges();
    amount.value = '20';
    amount.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    out_btn.click();
    fixture.detectChanges();
    tick(5000);
    fixture.detectChanges();
    expect(total.textContent).toBe(' Total : 60 ');
  }));

});
