import {Component, DestroyRef, inject, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {currencyInterface} from "../../types/currencyInterface";
import {DialogService, NotificationTypes} from "../../../../shared/services/dialog.service";
import {interval, map, take} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormControl} from "@angular/forms";
import {CurrencyExtService} from "../../services/currencyExt.service";
import {CurrencyDataService} from "../../services/currencyData.service";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})
export class CurrencyComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<currencyInterface>;
  private destroyRef = inject(DestroyRef);

  currencies: currencyInterface[] = [];

  displayedCurrencies = new FormControl(['USD', 'EUR', 'GBP']);

  displayedColumns: string[] = ['name', 'value', 'change', 'diffValue'];


  constructor(
    private currencyExtService: CurrencyExtService,
    private currencyDataService: CurrencyDataService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit() {
    // Получаем статус внешней API
    this.currencyExtService.getStatus()
      .pipe(take(1))
      .subscribe({
        next: data => {
          if (data.quotas.month.remaining === 0) {
            this.dialogService.notify("На внешней api конвертации закончились средства", NotificationTypes.error);
          }
        },
        error: () => {
          this.dialogService.notify("Произошла ошибка при получение данных с внешней api", NotificationTypes.error)
        }
      })

    // Получаем список поддерживаемых валют
    this.currencies = this.currencyDataService.getSupportedCurrencies()

    this.updateValues(); // Получаем первые значения
    // Получаем каждые 5 секунд значения
    interval(5000)
      .pipe(takeUntilDestroyed(this.destroyRef)) // не забываем отписаться при переходе на другую страницу
      .subscribe(() => {
        this.updateValues();
      });
  }


  get selectedCurrencies(): currencyInterface[] {
    return this.currencies.filter(currency => currency.selected);
  }

  get currenciesList(): string[] {
    return this.currencies.map(currency => currency.name);
  }

  /**
   * Запрос новой цены для всех валют в списке
   */
  updateValues() {
    if (!this.displayedCurrencies.value) {
      this.dialogService.notify("Произошла ошибка", NotificationTypes.error)
      return;
    }

    this.currencyExtService.getCurrencies(this.displayedCurrencies.value)
      .pipe(
        take(1),
        map(res => this.currencyDataService.convertCurrencyValues(res))
      )
      .subscribe({
        next: (res) => {
          console.log(1, res.data)
          console.log(2, this.currencies)

          this.currencies.forEach((currency: currencyInterface) => {
            if (res.data[currency.name]) {
              currency.diffValue = res.data[currency.name].value - currency.value;
              currency.value = res.data[currency.name].value;
            }
          });

        },
        error: () => this.dialogService.notify("Произошла ошибка при получение данных о валютах", NotificationTypes.error)
      })
  }

  /**
   * Обработчик выбора новых валют в выпадающем списке
   * @param data массив кодов валюты
   */
  currenciesChanged(data: string[]) {
    // Обновление свойства selected в этом массиве
    this.currencies.forEach(currency => {
      currency.selected = !!data.includes(currency.name);
    });
  }
}
