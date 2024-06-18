import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ProductsService } from '../products.service';
import { CombinedDataService } from '../combinedData.service';

/**
 * ChartsComponent component displays various charts based on data fetched from services.
 * It uses data from ContactsService, ProductsService, and CombinedDataService to generate different charts.
 */
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private productsService: ProductsService,
    private combinedDataService: CombinedDataService
  ) {}
  /**
   * Maximum value found in showProductState().
   */
  maxStateValue: number = 0;
  /**
   * Maximum total number in showProductStock().
   */
  maxTotalProducts: number = 0;
  /**
   * Legend position in chats 8 and 9.
   */
  legendPosition: any = 'below';

  // Descartados ¿temporalmente?
  // initialLetter: any[] = [];
  // contactsByFullName: any[] = [];
  // emailExtensions: any[]= [];
  // phonePrefixData: any[]= [];

  /**
   * Array to store cities where contacts are located.
   */
  contactsCity: any[] = [];
  /**
   * Array to store stock per product type.
   */
  productsStock: any[] = [];
  /**
   * Array to store price range per product.
   */
  productsPriceRange: any[] = [];
  /**
   * Array to store state os products: active/inactive.
   */
  stateProducts: any[] = [];
  /**
   * Array to store the stock by state of products.
   */
  stockProducts: any[] = [];
  /**
   * Array to order products according to the month of registration
   */
  productsPerMonth: any[] = [];
  /**
   * Array to store products by type of product.(SIN USAR)
   */
  // productsPerType: any[] = [];
  /**
   * Array to store products by producer (in %).
   */
  productsPerSupplier: any[] = [];
  /**
   * Array to store number of products by producer.
   */
  productsBySupplier: any[] = [];
  /**
   * Array to store the price by product.
   */
  pricePerProduct: any[] = [];
  /**
   * Array to store the number of products by producer.
   */
  numberProductsBySupplier: any[] = [];

  /**
   * Initializes the component.
   * Fetches data from services and calculates data for charts.
   */
  ngOnInit(): void {
    /**
     * Fetches contacts data and calculates the distribution of contacts by city.
     */
    this.contactsService.getContacts().subscribe((contacts: any[]) => {
      //aqui llega la lista (array) de datos

      // this.initialLetter = this.calculateInitialLettersData(contacts);
      // this.initialLetter.sort((a, b) => a.name.localeCompare(b.name));
      // this.contactsByFullName = this.calculateContactsByFullNameData(contacts);
      // this.emailExtensions = this.calculateEmailExtensionsData(contacts);
      //  this.phonePrefixData = this.generatePhonePrefixData(contacts);

      this.contactsCity = this.calculateContactCity(contacts);
    });
    /**
     * Fetches products data and calculates various metrics for display in charts.
     */
    this.productsService.getProducts().subscribe((products: any[]) => {
      //aqui llega la lista (array) de products

      //Sin usar
      // this.productsPerType = this.calculateProductsStockPerType(products);

      /**
       * Chart 6 producto, muestra los productos y su cantidad de stack
       */
      this.productsStock = this.calculateProductStockData(products);
      /**
       * Chart 7 producto, muestra los productos y sus rangos de precios
       */
      this.productsPriceRange = this.calculatePriceRange(products);
      /**
       * Chart 8 producto, muestra la cantidad de productos activos e inactivos
       */
      this.stateProducts = this.showProductState(products);
      /**
       * Chart 9 producto, muestra la cantidad de productos stock por productos activos e inactivos
       */
      this.stockProducts = this.showProductStock(products);
      /**
       * Chart 10 producto, muestra el alta de los productos por mes
       */
      this.productsPerMonth = this.showProductsPerMonth(products);
      /**
       * Chart 11 producto, muestra los precios por producto
       */
      this.pricePerProduct = this.calculatePriceProducts(products);
    });
    /**
     * Fetches combined data of contacts and products and calculates metrics for display in charts.
     */
    this.combinedDataService
      .getContactProducts()
      .subscribe((products: any[]) => {
        /**
         * Chart 1 productores, muestra la cantidad de productos activos e inactivos
         */
        this.numberProductsBySupplier =
          this.calculateNumberProductsPerSupplier(products);
        /**
         * Chart 2 y 4 productores, muestra la cantidad de productos por cada productor
         */
        this.productsPerSupplier =
          this.calculateProductsStockPerSupplier(products);
        /**
         * Chart 5 productores, muestra la cantidad de productos por cada productor en grafica lineal
         */
        this.productsBySupplier = this.calculateProductsPerProducer(products);
      });
  }
  /**
   * Calculates the distribution of contacts by city.
   * @param {any[]} contacts - The array of contacts.
   * @returns {any[]} An array of objects, each representing a city and the count of contacts in that city.
   */
  calculateContactCity(contacts: any[]): any[] {
    const contactsCity = [];

    const cityCounts: any = {};
    contacts.forEach((contact) => {
      if (contact.city) {
        const city = contact.city;
        if (cityCounts[city]) {
          cityCounts[city]++;
        } else {
          cityCounts[city] = 1;
        }
      }
    });
    for (const city in cityCounts) {
      if (cityCounts.hasOwnProperty(city)) {
        contactsCity.push({ name: city, value: cityCounts[city] });
      }
    }
    return contactsCity;
  }
  /**
   * Calculates the stock per product type.
   * @param {any[]} products - The array of products.
   * @returns {any[]} An array of objects, each representing a product type and its total stock.
   */
  //NO SE ESTA USANDO
  calculateProductsStockPerType(products: any[]): any[] {
    const totalProducts: any[] = [];

    products.forEach((product) => {
      const productType = product.product_type;
      const productName = product.name;
      const stock = parseInt(product.stock);

      // Buscar si ya existe un objeto para el proveedor actual
      const existingProductType = totalProducts.find(
        (p) => p.name === productType
      );

      if (existingProductType) {
        // Si ya existe, agregar un nuevo objeto al array 'series'
        let existingProduct = existingProductType.series.find(
          (p: any) => p.name === productName
        );
        if (existingProduct) {
          // Si ya existe, sumar el stock
          existingProduct.value += stock;
        } else {
          // Si no existe, agregar un nuevo objeto al array 'series'
          existingProductType.series.push({ name: productName, value: stock });
        }
      } else {
        // Si no existe el tipo de producto, crear un nuevo objeto para el tipo con el array 'series'
        totalProducts.push({
          name: productType,
          series: [{ name: productName, value: stock }],
        });
      }
    });
    totalProducts.sort((a, b) => a.name.localeCompare(b.name));
    // console.log("calculateProductsStockPerType", totalProducts);
    return totalProducts;
  }
  /**
   * Calculates the stock data for products to be displayed in a chart.
   * @param {any[]} products - The array of products.
   * @returns {any[]} An array of objects, each representing a product and its stock.
   */
  calculateProductStockData(products: any[]): any[] {
    const productsStock: any[] = [];
    products.forEach((product) => {
      if (product.active) {
        productsStock.push({
          name: product.name,
          value: parseInt(product.stock),
        });
      }
    });
    // Ordenar los productos alfabéticamente por el nombre
    productsStock.sort((a, b) => a.name.localeCompare(b.name));

    return productsStock;
  }
  // FUNCIÓN CON map() sin los productos no activos
  // calculateProductStockData(products: any[]): any[] {
  //   //CÓDIGO EXPLICATIVO:
  //   const productosFiltrados = products.filter(product => product.active);
  //   const productosMapeados = productosFiltrados.map(product => {
  //     return {
  //     name: product.name,
  //     value: product.stock
  //     }
  //   });
  //   return productosMapeados;

  //CÓDIGO REFACTORIZADO Y EFICIENTE:
  // return products.filter(product => product.active).map(product => {
  //   return {
  //   name: product.name,
  //   value: product.stock
  //   };
  // });
  //}
  /**
   * Calculates the price range for active and inactive products.
   *
   * @param {Object[]} products - An array of product objects, each having properties like 'price', 'active', and 'stock'.
   * @returns {Object[]} An array of objects, each representing a price range ('productos activos' or 'productos desactivados') and its count.
   */
  calculatePriceRange(products: any[]): any[] {
    const tempPriceRange = [
      {
        name: 'productos activos',
        series: <any[]>[],
      },
      {
        name: 'productos desactivados',
        series: <any[]>[],
      },
    ];
    products.forEach((product) => {
      const size = product.price;
      const range = `${size - (size % 5)} - ${size - (size % 5) + 5} €.`;
      var index = 0;
      if (!product.active) {
        index = 1;
      }
      const existingRange = tempPriceRange[index].series.find(
        (item) => item.name === range
      );
      if (existingRange) {
        existingRange.value++;
      } else {
        tempPriceRange[index].series.push({ name: range, value: 1 });
      }
      if (product.active) {
        //se añadio antes en tempPriceRange[0]
        //ahora se comprueba si existe en DESACTIVADO = tempPriceRange[1]
        const oppositeExist = tempPriceRange[1].series.find(
          (item) => item.name === range
        );
        if (!oppositeExist) {
          //si no existe en el indice 1, o lo que es lo mismo en elproducto Desactivado
          //se añade en el producto desactivado con valor 0
          tempPriceRange[1].series.push({ name: range, value: 0 });
        }
      } else {
        //el valor se añadio arriba en tempPriceRange[1]
        //se comprueba si existe en ACTIVADO = tempPriceRange[0]
        const oppsiteNoExist = tempPriceRange[0].series.find(
          (item) => item.name === range
        );
        if (!oppsiteNoExist) {
          //si no existe en el eindice 0, o lo que es lo mismo en el producto ACTIVADO
          //se añade en el producto activado con valor 0
          tempPriceRange[0].series.push({ name: range, value: 0 });
        }
      }
    });

    return tempPriceRange.map((entry) => {
      return {
        ...entry,
        series: entry.series.sort(
          (a, b) => Number(a.name.split('-')[0]) - Number(b.name.split('-')[0])
        ),
      };
    });
  }
  /**
   * Counts the number of active and inactive products.
   *
   * @param {Object[]} products - An array of product objects, each having a boolean 'active' property.
   * @returns {Object[]} An array of objects, each representing the count of active or inactive products.
   */
  showProductState(products: any[]): any[] {
    let activeCount = 0;
    let inactiveCount = 0;

    products.forEach((product) => {
      this.maxStateValue++;
      if (product.active) {
        activeCount++;
      } else {
        inactiveCount++;
      }
    });

    return [
      {
        name: 'Productos activos',
        value: activeCount,
      },
      {
        name: 'Productos inactivos',
        value: inactiveCount,
      },
    ];
  }
  /**
   * Calculates the total stock for active and inactive products.
   *
   * @param {Object[]} products - An array of product objects, each having properties like 'active' and 'stock'.
   * @returns {Object[]} An array of objects, each representing the total stock of active or inactive products.
   */
  showProductStock(products: any[]): any[] {
    let activeCountStock: any = 0;
    let inactiveCountStock: any = 0;

    products.forEach((product) => {
      if (product.active) {
        activeCountStock += product.stock;
        this.maxTotalProducts += product.stock;
      } else {
        inactiveCountStock += product.stock;
        this.maxTotalProducts += product.stock;
      }
    });

    return [
      {
        name: 'Stock activo',
        value: activeCountStock,
      },
      {
        name: 'Stock inactivo',
        value: inactiveCountStock,
      },
    ];
  }
  /**
   * Counts the number of products added per month.
   *
   * @param {Object[]} products - An array of product objects, each having a 'date_added' property.
   * @returns {Object[]} An array of objects, each representing the count of products added in a particular month.
   */
  showProductsPerMonth(products: any[]): any[] {
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const productsPerMonth: any[] = [];
    // const productsMap = new Map(products.map(product => [new Date(product.date_added).getMonth(), product]));
    // const prods = productsMap.get(4);
    products.forEach((product) => {
      const date = new Date(product.date_added);
      const month = date.getMonth();
      const existingMonth = productsPerMonth.find(
        (item: { name: string }) => item.name === monthNames[month]
      );
      if (existingMonth) {
        existingMonth.value++;
      } else {
        productsPerMonth.push({ name: monthNames[month], value: 1 });
      }
    });

    return productsPerMonth;
  }
  /**
   * Calculates the price of products grouped by type and then by name within each type.
   *
   * @param {Object[]} products - An array of product objects, each having properties like 'product_type', 'name', and 'price'.
   * @returns {Object[]} An array of objects, each representing a product type and its products listed by name along with their prices.
   */
  calculatePriceProducts(products: any[]): any[] {
    const totalProducts: any[] = [];

    products.forEach((product) => {
      const productType = product.product_type;
      const productName = product.name;
      const productPrice = product.price;
      const existingProductType = totalProducts.find(
        (p: any) => p.name === productType
      );
      if (existingProductType) {
        // Si ya existe, agregar un nuevo objeto al array 'series'
        let existingProduct = existingProductType.series.find(
          (p: any) => p.name === productName
        );
        if (existingProduct) {
          // Si ya existe, sumar el stock
          existingProduct.value = productPrice;
        } else {
          // Si no existe, agregar un nuevo objeto al array 'series'
          existingProductType.series.push({
            name: productName,
            value: productPrice,
          });
        }
      } else {
        // Si no existe el tipo de producto, crear un nuevo objeto para el tipo con el array 'series'
        totalProducts.push({
          name: productType,
          series: [{ name: productName, value: productPrice }],
        });
      }
    });
    return totalProducts.map((entry) => {
      return {
        ...entry,
        series: entry.series.sort((a: { name: string }, b: { name: string }) =>
          a.name.localeCompare(b.name)
        ),
      };
    });
  }
  /**
   * Counts the number of products per supplier based on contact names.
   *
   * @param {Object[]} contacts - An array of contact objects, each having properties like 'contactName' and 'contactSurname'.
   * @returns {Object[]} An array of objects, each representing a supplier (by full name) and the count of products associated with them.
   */
  calculateNumberProductsPerSupplier(contacts: any[]): any[] {
    const numProductsSupplier: any[] = [];
    contacts.forEach((contact) => {
      const fullName =
        contact.contactName.toString() +
        ' ' +
        contact.contactSurname.toString();

      const existingProduct = numProductsSupplier.find(
        (item: { name: string }) => item.name === fullName
      );
      if (existingProduct) {
        existingProduct.value++;
      } else {
        numProductsSupplier.push({ name: fullName, value: 1 });
      }
    });
    // Ordenar los productos alfabéticamente por el nombre
    numProductsSupplier.sort((a, b) => a.name.localeCompare(b.name));
    return numProductsSupplier;
  }
  /**
   * Groups products by supplier and aggregates their stock.
   *
   * @param {Object[]} products - An array of product objects, each having properties like 'contactName', 'contactSurname', 'productName', and 'productStock'.
   * @returns {Object[]} An array of objects, each representing a supplier (by full name) and their products listed by name along with their stock.
   */
  calculateProductsStockPerSupplier(products: any[]): any[] {
    const suppliers: any[] = [];

    products.forEach((product) => {
      const supplier = product.contactName + ' ' + product.contactSurname;
      const productName = product.productName;
      const stock = parseInt(product.productStock);

      // Buscar si ya existe un objeto para el proveedor actual
      let existingSupplier = suppliers.find((s) => s.name === supplier);

      if (!existingSupplier) {
        // Si no existe, crear un nuevo objeto para el proveedor con el array 'series'
        existingSupplier = {
          name: supplier,
          series: [], // Inicializar el array 'series' vacío
        };
        suppliers.push(existingSupplier); // Agregar el nuevo objeto al array 'suppliers'
      }

      // Agregar un nuevo objeto al array 'series' del proveedor existente
      existingSupplier.series.push({ name: productName, value: stock });
    });

    suppliers.sort((a, b) => a.name.localeCompare(b.name));
    return suppliers;
  }
  /**
   * Counts the number of products per producer based on contact names.
   *
   * @param {Object[]} contacts - An array of contact objects, each having properties like 'contactName' and 'contactSurname'.
   * @returns {Object[]} An array of objects, each representing a producer (by full name) and the count of products associated with them.
   */
  calculateProductsPerProducer(contacts: any[]): any[] {
    const productsPerProducer = [
      {
        name: 'productos',
        series: <any[]>[],
      },
    ];
    contacts.forEach((contact) => {
      const fullName = contact.contactName + ' ' + contact.contactSurname;

      const existingContact = productsPerProducer[0].series.find(
        (item) => item.name === fullName
      );

      if (existingContact) {
        existingContact.value++;
      } else {
        productsPerProducer[0].series.push({ name: fullName, value: 1 });
        productsPerProducer[0].series.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
    });
    return productsPerProducer;
  }
  /////////////////////////*****************////////////////////////

  //Funciones de contacto ¿temporalmente? descartadas

  /////////////////////////*****************////////////////////////

  /**
   * Calculates the frequency of email extensions in a list of contacts.
   *
   * @param {Object[]} contacts - An array of contact objects, each having an 'email' property.
   * @returns {Object[]} An array of objects, each representing an email extension and its occurrence count.
   */
  calculateEmailExtensionsData(contacts: any[]): any[] {
    const emailExtensionMap: any = new Map<string, number>();

    contacts.forEach((contact) => {
      if (contact.email) {
        const emailParts = contact.email.split('@');
        if (emailParts.length === 2) {
          //selecionamos el dominio es la segunda parte la 0 antes del @ la 1 es todo lo que va despues
          const domain = emailParts[1];
          const firstDotindex = domain.indexOf('.');
          if (firstDotindex !== -1) {
            const extension = domain.substring(firstDotindex);
            if (emailExtensionMap.has(extension)) {
              emailExtensionMap.set(
                extension,
                emailExtensionMap.get(extension) + 1
              );
            } else {
              emailExtensionMap.set(extension, 1);
            }
          }
        }
      }
    });
    const emailExtensions: any[] = [];
    emailExtensionMap.forEach((value: any, key: any) => {
      emailExtensions.push({ name: key, value: value });
    });
    return emailExtensions;
  }
  /**
   * Counts the number of contacts starting with each initial letter of their surname.
   *
   * @param {Object[]} contacts - An array of contact objects, each having a 'surname' property.
   * @returns {Object[]} An array of objects, each representing an initial letter and the count of contacts starting with that letter.
   */
  calculateInitialLettersData(contacts: any[]): any[] {
    return contacts.reduce((result: any[], contact) => {
      const initial = contact.surname.charAt(0).toUpperCase();
      if (result.find((item) => item.name === initial)) {
        result.find((item) => item.name === initial).value++;
      } else {
        result.push({ name: initial, value: 1 });
      }
      return result;
    }, []);
  }
  /**
   * Groups contacts by the length of their full name and counts them.
   *
   * @param {Object[]} contacts - An array of contact objects, each having 'name', 'surname', and 'lastname' properties.
   * @returns {Object[]} An array of objects, each representing a character range and the count of contacts fitting into that range.
   */
  calculateContactsByFullNameData(contacts: any[]): any[] {
    const tempContactsByFullName = [
      {
        name: 'Contacts',
        series: <any[]>[],
      },
    ];
    contacts.forEach((contact) => {
      const fullName = contact.name + contact.surname + contact.lastname;
      const size = fullName.length;
      const range = `${size - (size % 5)} - ${size - (size % 5) + 4} ch.`;
      const existingRange = tempContactsByFullName[0].series.find(
        (item) => item.name === range
      );
      if (existingRange) {
        existingRange.value++;
      } else {
        tempContactsByFullName[0].series.push({ name: range, value: 1 });
      }
    });
    return tempContactsByFullName.map((entry) => {
      return {
        ...entry,
        series: entry.series.sort(
          (a, b) => Number(a.name.split('-')[0]) - Number(b.name.split('-')[0])
        ),
      };
    });
  }
  /**
   * Counts the occurrences of phone prefixes in a list of contacts.
   *
   * @param {Object[]} contacts - An array of contact objects, each having a 'telephone' property.
   * @returns {Object[]} An array of objects, each representing a phone prefix and its occurrence count.
   */
  generatePhonePrefixData(contacts: any[]): any[] {
    const phonePrefixdata = [];

    const prefixCounts: any = {};
    contacts.forEach((contact) => {
      if (contact.telephone) {
        const phonePrefix = contact.telephone.substring(0, 1);
        if (prefixCounts[phonePrefix]) {
          prefixCounts[phonePrefix]++;
        } else {
          prefixCounts[phonePrefix] = 1;
        }
      }
    });
    for (const prefix in prefixCounts) {
      if (prefixCounts.hasOwnProperty(prefix)) {
        phonePrefixdata.push({ name: prefix, value: prefixCounts[prefix] });
      }
    }
    return phonePrefixdata;
  }
  /**
   * Formats axis tick values to display as integers.
   *
   * @param {number} value - The original value to format.
   * @returns {string} The formatted value as a string.
   */
  formatAxisTick(value: number) {
    // return Math.floor(value).toString();
    return value.toString();
  }
  /**
   * Formats axis tick values to display as floor integer values.
   *
   * @param {number} value - The original value to format.
   * @returns {string} The formatted value as a string.
   */
  formatAxisTick2(value: number) {
    return Math.floor(parseInt(value.toString()));
    // return value.toString();
  }
  /////////////////////////*****************////////////////////////

  //Funciones aun sin usar

  /////////////////////////*****************////////////////////////

  /**
   * Groups products by type and lists their prices.
   *
   * @param {Object[]} products - An array of product objects, each having properties like 'product_type' and 'price'.
   * @returns {Object[]} An array of objects, each representing a product type and its products listed by name along with their prices.
   */
  calculatePricePerProduct(products: any[]): any[] {
    const pricePerProduct = [
      {
        name: 'Precios/producto',
        series: <any[]>[],
      },
    ];
    products.forEach((product) => {
      // const fullName = contact.contactName + ' ' + contact.contactSurname;
      const productType = product.product_type;
      const existingProductType = pricePerProduct[0].series.find(
        (item) => item.name === productType
      );

      if (existingProductType) {
        existingProductType.value = product.price;
      } else {
        // productsPerProducer[0].name = fullName;
        pricePerProduct[0].series.push({
          name: product.name,
          value: product.price,
        });
      }
    });
    return pricePerProduct.map((entry) => {
      return {
        ...entry,
        series: entry.series.sort(
          (a, b) => Number(a.name.split('-')[0]) - Number(b.name.split('-')[0])
        ),
      };
    });
  }

  /**
   * Groups products by name and aggregates their stock.
   *
   * @param {Object[]} products - An array of product objects, each having properties like 'name' and 'stock'.
   * @returns {Object[]} An array of objects, each representing a product name and their total stock.
   */
  calculateStockByProduct(products: any[]): any[] {
    const productsBySupplier = new Map<string, number>();

    // Iterar sobre cada producto para calcular la cantidad total de productos por proveedor
    products.forEach((product) => {
      const name = product.name;
      const stock = product.stock;

      // Verificar si ya tenemos registros para este proveedor
      if (productsBySupplier.has(name)) {
        // Si ya existe, agregar el stock al total existente
        productsBySupplier.set(name, productsBySupplier.get(name) + stock);
      } else {
        // Si no existe, establecer el stock como el total inicial
        productsBySupplier.set(name, stock);
      }
    });

    // Convertir el mapa en un formato adecuado para el gráfico de barras
    const chartData = Array.from(productsBySupplier.entries()).map(
      ([name, value]) => {
        return { name: name, value: value };
      }
    );

    // Ordenar los datos por nombre del proveedor
    chartData.sort((a, b) => a.name.localeCompare(b.name));
    return chartData;
  }
}
