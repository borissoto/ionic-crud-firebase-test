import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { Item } from "../../modules/item/item.module";
import { ShoppingListService } from "../../services/shopping-list/shopping-list.service";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  shoppingList$: Observable<Item[]>;

  constructor(
    public navCtrl: NavController,
    private shopping: ShoppingListService
  ) {
    this.shoppingList$ = this.shopping
      .getShoppingList() // DB list
      .snapshotChanges() // Key and Value
      .map((changes) => {
        return changes.map((c) => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });
  }
}
