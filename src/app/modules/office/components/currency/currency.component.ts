import {Component, DestroyRef, inject, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {currencyInterface} from "../../types/currencyInterface";
import {CurrencyService} from "../../services/currency.service";
import {DialogService, NotificationTypes} from "../../../../shared/services/dialog.service";
import {interval, take} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})
export class CurrencyComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<currencyInterface>;
  private destroyRef = inject(DestroyRef);

  currencies: currencyInterface[] = [];

  displayedCurrencies = new FormControl(['usd', 'eur', 'gbr']);

  displayedColumns: string[] = ['name', 'value', 'change', 'diffValue'];


  constructor(
    private currencyService: CurrencyService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit() {
    this.currencyService.getStartValues()
      .pipe(take(1))
      .subscribe({
        next: (values) => this.currencies = values,
        error: () => this.dialogService.notify("Произошла ошибка при получение данных о валютах", NotificationTypes.error)
      })

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
    this.currencies.forEach((currency) => {
      if (!currency.selected) return;

      this.currencyService.convertCurrency({
        currencyStart: "rub",
        currencyEnd: currency.name,
        currencyEndValue: 100
      })
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            currency.diffValue = parseInt(res.currencyStartValue) - currency.value;
            currency.value = parseInt(res.currencyStartValue)
          },
          error: () => this.dialogService.notify("Произошла ошибка при получение данных о валютах", NotificationTypes.error)
        })
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
