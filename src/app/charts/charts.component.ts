import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ProductsService } from '../products.service';
import { CombinedDataService } from '../combinedData.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit{
  
  constructor(private contactsService: ContactsService, private productsService: ProductsService, private combinedDataService: CombinedDataService) { }
  maxStateValue: number = 0;
  maxTotalProducts: number = 0;
  legendPosition: any = 'below';
  
  initialLetter: any[] = [];
  contactsByFullName: any[] = [];
  // emailExtensions: any[]= [];
  contactsCity: any[]= [];
  phonePrefixData: any[]= [];
  
  productsStock: any[] = [];
  productsPriceRange: any[] = [];
  productsPriceInactiveRange: any[] = [];
  stateProducts: any[] = [];
  stockProducts: any[] = [];
  productsPerMonth: any[] = [];
  productsPerType: any[] = [];
  productsPerSupplier: any[] = [];
  productsBySupplier: any[] = [];
  pricePerProduct: any[] = [];
  numberProductsBySupplier: any[] = [];
  
  colorScheme = {
    domain: ['#CFC0BB', '#7aa3e5']
  };
  // colorScheme = {
  //   domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  // };


  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((contacts: any[]) => {
      //aqui llega la lista (array) de datos 
    
      /**
      *tabla uno guarda y calcula los datos a mostrar y despues se ordenan alfabeticamente 
      */
      this.initialLetter = this.calculateInitialLettersData(contacts);
      this.initialLetter.sort((a, b) => a.name.localeCompare(b.name));
      /**
       * segunda tabla, muestra el rango de largos de nombres
       */
      this.contactsByFullName = this.calculateContactsByFullNameData(contacts);
      /**
       * tercera tabla, seteo de datos de extensiones de email
       */
      // this.emailExtensions = this.calculateEmailExtensionsData(contacts);
      this.contactsCity = this.calculateContactCity(contacts);
      /**
       * cuarta tabla, seteo de datos de extensiones de email
      */
     this.phonePrefixData = this.generatePhonePrefixData(contacts);
    });
    this.productsService.getProducts().subscribe((products: any[]) => {
      //aqui llega la lista (array) de products 
      /**
       * 1 tabla producto, muestra la cantidad de cada producto
      */
     this.productsStock = this.calculateProductStockData(products);
     /**
      * 2 tabla producto, muestra el rango de precios de los productos
     */
    this.productsPriceRange = this.calculatePriceRange(products);
    /**
      * 3 tabla producto, muestra la cantidad de stock activos e inactivo
     */
    // this.stateProducts = this.productsState(products);
    this.stateProducts = this.showProductState(products);
    /**
      * 4 tabla producto, muestra la cantidad de productos activos e inactivos
     */
    this.stockProducts = this.showProductStock(products);
    /**
      * 5 tabla producto, muestra el alta de los productos por mes
     */
    this.productsPerMonth = this.showProductsPerMonth(products);
    /**
      * 6 tabla producto, muestra los productos y su stock por categorias
     */
    this.productsPerType = this.calculateProductsStockPerType(products);

    this.pricePerProduct = this.calculateMerda(products);

    
  });
  // this.productsService.getProductPerType('type').subscribe((products: any[]) => {
    this.combinedDataService.getContactProducts().subscribe((products: any[]) => {
      this.productsPerSupplier = this.calculateProductsStockPerSupplier(products);
      /**
       * 2 tabla contactos, muestra la cantidad de productos activos e inactivos
      */
     //  this.productsBySupplier = this.calculateProductsBySupplier(products);
     //  this.productsBySupplier = this.calculateProductsPerSupplier(products);
     this.productsBySupplier = this.calculateProductsPerProducer(products);
     this.numberProductsBySupplier = this.calculateNumberProductsPerSupplier(products);
    });
  }



 showProductsPerMonth(products: any[]): any[] {
  
      const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      
      const productsPerMonth: any []= []
      // const productsMap = new Map(products.map(product => [new Date(product.date_added).getMonth(), product]));
      // const prods = productsMap.get(4);
      // productsPerMonth.push(productsMap);
      // console.log("MAP", prods);
      products.forEach(product => {
        const date = new Date(product.date_added);
        const month = date.getMonth();
        const existingMonth = productsPerMonth.find((item: { name: string }) => item.name === monthNames[month]);        
        if(existingMonth){
          existingMonth.value++;
        }else{
          productsPerMonth.push({name: monthNames[month], value: 1})
        }
      });
    
      return productsPerMonth;
    }

    
  showProductStock(products: any[]): any[] {
  let activeCountStock: any = 0;
  let inactiveCountStock: any = 0;

  products.forEach(product => {
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
      value: activeCountStock
    },
    {
      name: 'Stock inactivo',
      value: inactiveCountStock
    }
  ];
  }


showProductState(products: any[]): any[] {
  let activeCount = 0;
  let inactiveCount = 0;

  products.forEach(product => {
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
      value: activeCount
    },
    {
      name: 'Productos inactivos',
      value: inactiveCount
    }
  ];
}

  // productsState(products: any[]): any[]{
  //   const tempProductsState= [{
  //       name: 'Products',
  //       series: 0},
  //     {
  //       name: 'InactiveProducts',
  //       series: 0
  //     }]
    
  //   var actives = 0;
  //   var inactives = 0;
  //   products.forEach(product=>{
  //     const isActive = product.active;
  //     // if (product.active){
  //     // const existingRange = tempProductsByPrice[0].series.find(item => item.price === range);
  //     // const existingRange = tempProductsByPrice[0].series.find(item => item.name === range);
  //     if(isActive){
  //       actives++;
  //       tempProductsState[0].series = actives;
  //     }else{
  //       inactives++
  //       tempProductsState[1].series = actives;
  //     }
    
  //   });
  //   return tempProductsState;
  // }

  // productsState(products: any[]): any[] {
  //   // this.maxStateValue = 
  //   const stateProduct: any[] = []; 
  //   products.forEach(product => {
  //     if(product.active){
  //       stateProduct.push({name: product.name, value: product.active});
  //     }
  //   })
  //   return stateProduct;
  // }



  /////////////////////////*****************////////////////////////

  // calculatePriceRange(products: any[]): any[]{
  //   const tempProductsByPrice= [{
  //       name: 'Products',
  //       series:<any[]> []},
  //     {
  //       name: 'InactiveProducts',
  //       series:<any[]> []
  //     }]
    
  //   products.forEach(product=>{
  //     const price = product.price;
  //     const range = `${price - (price % 5)} - ${price - (price % 5)+ 5} €.`;
  //     if (product.active){
  //     // const existingRange = tempProductsByPrice[0].series.find(item => item.price === range);
  //     const existingRange = tempProductsByPrice[0].series.find(item => item.name === range);
  //     if(existingRange){
  //       existingRange.value++;
  //     }else{
  //       tempProductsByPrice[0].series.push({name: range, value: 1})
  //     }
  //   }else{
  //     const existingRange = tempProductsByPrice[1].series.find(item => item.name === range);
  //     if(existingRange){
  //       existingRange.value++;
  //     }else{
  //       tempProductsByPrice[1].series.push({name: range, value: 1})
  //     }
  //   }
  //   });
  //   // return tempProductsByPrice;
  //   return tempProductsByPrice.map(entry =>{
  //     return{
  //       ...entry,
  //       series: entry.series.sort((a,b) => Number(a.name.split('-')[0]) - Number(b.name.split('-')[0]))
  //     }
  //   });
  // }

  calculatePriceRange(products: any[]): any[]{
      const tempPriceRange= [{
        name: 'productos activos',
        series: <any[]>[]
      },{
        name: 'productos desactivados',
        series: <any[]>[]
      }]
      products.forEach(product=>{
        const size = product.price;
        const range = `${size -(size % 5)} - ${size - (size % 5) + 5} €.`;
        var index=0;
        if (!product.active){
          index=1;
        }
        const existingRange = tempPriceRange[index].series.find(item => item.name === range);
        if(existingRange){
          existingRange.value++;
        }else{
          tempPriceRange[index].series.push({name: range, value: 1})
        }
        if(product.active){
          //se añadio antes en tempPriceRange[0]
          //ahora se comprueba si existe en DESACTIVADO = tempPriceRange[1]
          const oppositeExist = tempPriceRange[1].series.find(item => item.name === range);
          if(!oppositeExist){//si no existe en el indice 1, o lo que es lo mismo en elproducto Desactivado
            //se añade en el producto desactivado con valor 0
            tempPriceRange[1].series.push({name: range, value: 0})
          }
        }else {
          //el valor se añadio arriba en tempPriceRange[1]
          //se comprueba si existe en ACTIVADO = tempPriceRange[0]
          const oppsiteNoExist = tempPriceRange[0].series.find(item => item.name === range);
          if(!oppsiteNoExist){//si no existe en el eindice 0, o lo que es lo mismo en el producto ACTIVADO
            //se añade en el producto activado con valor 0
            tempPriceRange[0].series.push({name: range, value: 0})
          }
        }
      });
  
      return tempPriceRange.map( entry => {
        return {
          ...entry,
          series: entry.series.sort((a,b) => Number(a.name.split('-')[0]) - Number(b.name.split('-')[0]))
        }
      });
    }

  calculateNumberProductsPerSupplier(contacts: any[]): any[] {
    const numProductsSupplier: any[] = []; 
    contacts.forEach(contact => {
      const fullName = contact.contactName.toString() + ' ' + contact.contactSurname.toString();

      const existingProduct = numProductsSupplier.find((item: { name: string }) => item.name === fullName);        
      if(existingProduct){
        existingProduct.value++;
      }else{
        numProductsSupplier.push({name: fullName, value: 1})
      }
    });
      // Ordenar los productos alfabéticamente por el nombre
      numProductsSupplier.sort((a, b) => a.name.localeCompare(b.name));
    console.log("numProductsSupplier", numProductsSupplier)
    return numProductsSupplier;
  }   
  

  calculateProductStockData(products: any[]): any[] {
    const productsStock: any[] = []; 
    products.forEach(product => {
      if(product.active){
        productsStock.push({name: product.name, value: parseInt(product.stock)});
      }
    })
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

  // calculateProductStockData(products: any[]): any[] {
  //     return products.reduce((result: any[], product) => {
  //         const productName= product.name;
  //         if(product.active){

  //           if (result.find(item => item.name === productName)) {
  //             result.find(item => item.name === productName).value++;
  //           } else {
  //             result.push({ name: productName, value: product.stock });
  //           }
  //         }
  //     return result;
  //   }, []);
  // }


  // FUNCIONES DE CONTACTOS
  generatePhonePrefixData(contacts: any[]): any[]{
    const phonePrefixdata = [];

    const prefixCounts: any = {};
    contacts.forEach(contact => {
      if(contact.telephone){
        const phonePrefix = contact.telephone.substring(0, 1);
        if(prefixCounts[phonePrefix]){
          prefixCounts[phonePrefix]++;
        }else{
          prefixCounts[phonePrefix] = 1;
        }
      }
    });
    for (const prefix in prefixCounts) {
      if(prefixCounts.hasOwnProperty(prefix)){
        phonePrefixdata.push({name: prefix, value:prefixCounts[prefix]});
      }
    }
    return phonePrefixdata;
  }

  // calculateEmailExtensionsData(contacts: any[]): any[]{
  //   const emailExtensionMap: any = new Map<string, number>();

  //   contacts.forEach(contact => {
  //     if(contact.email){
  //       const emailParts = contact.email.split('@');
  //       if (emailParts.length === 2){
  //         //selecionamos el dominio es la segunda parte la 0 antes del @ la 1 es todo lo que va despues
  //         const domain = emailParts[1];
  //         const firstDotindex = domain.indexOf('.');
  //         if (firstDotindex !== -1){
  //           const extension =  domain.substring(firstDotindex);
  //           if(emailExtensionMap.has(extension)){
  //             emailExtensionMap.set(extension, emailExtensionMap.get(extension) + 1);
  //           }else {
  //             emailExtensionMap.set(extension, 1);
  //           }
  //         }
  //       }
  //     }
  //   })
  //   const emailExtensions:any[] = [];
  //   emailExtensionMap.forEach((value:any, key: any)=> {
  //     // debugger;
  //     emailExtensions.push({ name: key, value: value})
  //   })
  //   return emailExtensions;
  // }

  calculateContactCity(contacts: any[]): any[]{
    const contactsCity = [];

    const cityCounts: any = {};
    contacts.forEach(contact => {
      if(contact.city){
        const city = contact.city;
        if(cityCounts[city]){
          cityCounts[city]++;
        }else{
          cityCounts[city] = 1;
        }
      }
    });
    for (const city in cityCounts) {
      if(cityCounts.hasOwnProperty(city)){
        contactsCity.push({name: city, value:cityCounts[city]});
      }
    }
    return contactsCity;
  }

  calculateProductsStockPerSupplier(products: any[]): any[] {
    console.log("ProductsSUP: ", products);
    const suppliers: any[] = [];
  
    products.forEach(product => {
      const supplier = product.contactName + ' ' + product.contactSurname;
      const productName = product.productName;
      const stock = parseInt(product.productStock);
  
      // Buscar si ya existe un objeto para el proveedor actual
      let existingSupplier = suppliers.find(s => s.name === supplier);
  
      if (!existingSupplier) {
        // Si no existe, crear un nuevo objeto para el proveedor con el array 'series'
        existingSupplier = {
          name: supplier,
          series: [] // Inicializar el array 'series' vacío
        };
        suppliers.push(existingSupplier); // Agregar el nuevo objeto al array 'suppliers'
      }
  
      // Agregar un nuevo objeto al array 'series' del proveedor existente
      existingSupplier.series.push({ name: productName, value: stock });
    });
  
    suppliers.sort((a, b) => a.name.localeCompare(b.name));
    console.log("Suppliers: ", suppliers);
    return suppliers;
  }

  // calculateProductsStockPerSupplier(products: any[]): any[] {
  //   console.log("ProductsSUP: ", products);
  //   const suppliers: any[] = [];
  
  //   products.forEach(product => {
  //     const supplier = product.contactName + ' ' + product.contactSurname;
  //     const productName = product.productName;
  //     const stock = parseInt(product.productStock);
      
  //     // Buscar si ya existe un objeto para el proveedor actual
  //     const existingSupplier = suppliers.find(s => s.name === supplier);
      
  //     if (existingSupplier) {
  //       // Si ya existe, agregar un nuevo objeto al array 'series'
  //       existingSupplier.series.push({ name: productName, value: stock });
  //     } else {
  //       // Si no existe, crear un nuevo objeto para el proveedor con el array 'series'
  //       suppliers.push({
  //         name: supplier,
  //         series: [{ name: productName, value: stock }]
  //       });
  //     }
  //   });
  
  //   console.log("Suppliers: ", suppliers);
  //   return suppliers;
  // }
  
// Posible solucion problema con calculateProductsStockPerType
// Define el tipo de la serie
// interface ProductSeries {
//   name: string;
//   value: number;
// }

// // Define el tipo del producto con serie
// interface ProductWithSeries {
//   name: string;
//   series: ProductSeries[];
// }

// calculateProductsStockPerType(products: Product[]): ProductWithSeries[] {
//   console.log("Products: ", products);
//   const totalProducts: ProductWithSeries[] = [];

  calculateProductsStockPerType(products: any[]): any[] {
    console.log("Products: ", products);
    const totalProducts: any[] = [];
    // const existingProduct: any[] = [];
    
    products.forEach(product => { 
      const productType = product.product_type;
      const productName = product.name;
      const stock = parseInt(product.stock);
      
      // Buscar si ya existe un objeto para el proveedor actual
      const existingProductType = totalProducts.find(p => p.name === productType);
      
      if (existingProductType) {
        // Si ya existe, agregar un nuevo objeto al array 'series'
        let existingProduct = existingProductType.series.find((p: any) => p.name === productName);
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
          series: [{ name: productName, value: stock }]
        });
      }
    });
    totalProducts.sort((a, b) => a.name.localeCompare(b.name));
    console.log("TotalProducts: ", totalProducts);
    return totalProducts;
  }
  
  
  
    
    // const productsTypeList = [];

    // const producType: any = {};
    // products.forEach(product => {
    //   if(product.name){
    //     const city = contact.city;
    //     if(cityCounts[city]){
    //       cityCounts[city]++;
    //     }else{
    //       cityCounts[city] = 1;
    //     }
    //   }
    // });
    // for (const city in cityCounts) {
    //   if(cityCounts.hasOwnProperty(city)){
    //     contactsCity.push({name: city, value:cityCounts[city]});
    //   }
    // }
    // return contactsCity;
  calculateMerda(products: any[]): any[] {
    const totalProducts: any[] = [];
    // const productsPerProducer= [{
    //   name: 'producer',
    //   series: <any[]>[] 
    // }];  
    products.forEach(product => {
    const productType = product.product_type;
    const productName = product.name;
    const productPrice = product.price;
    const existingProductType = totalProducts.find((p: any) => p.name === productType);
    if (existingProductType) {
      // Si ya existe, agregar un nuevo objeto al array 'series'
      let existingProduct = existingProductType.series.find((p: any) => p.name === productName);
      if (existingProduct) {
        // Si ya existe, sumar el stock
        existingProduct.value = productPrice;
      } else {
        // Si no existe, agregar un nuevo objeto al array 'series'
        existingProductType.series.push({ name: productName, value: productPrice });
      }
    } else {
      // Si no existe el tipo de producto, crear un nuevo objeto para el tipo con el array 'series'
      totalProducts.push({
        name: productType,
        series: [{ name: productName, value: productPrice }]
      });
    }
  });
      console.log("calculateKK", totalProducts)
      return totalProducts.map(entry =>{
        return{
          ...entry,
          series: entry.series.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name))
        }
      });
  }
  calculateProductsPerProducer(contacts: any[]): any[] {
    const productsPerProducer= [{
      name: 'productos',
      series: <any[]>[]
    }];
    contacts.forEach(contact => {
        const fullName = contact.contactName + ' ' + contact.contactSurname;

        const existingContact = productsPerProducer[0].series.find(item => item.name === fullName);
        
          if(existingContact){
            existingContact.value++;
          }else{
          // productsPerProducer[0].name = fullName;   
          productsPerProducer[0].series.push({name: fullName, value: 1})
          productsPerProducer[0].series.sort((a, b) => a.name.localeCompare(b.name));
      }
      });
      console.log("calculateProductsPerProducer", productsPerProducer)
      return productsPerProducer;
      // return productsPerProducer.map(entry =>{
      //   return{
      //     ...entry,
      //     series: entry.series.sort((a,b) => Number(a.name) - Number(b.name))
      //   }
      // });
  }
  calculatePricePerProduct(products: any[]): any[] {
    const pricePerProduct= [{
      name: 'product_type',
      series: <any[]>[]
    }];
    products.forEach(product => {
        // const fullName = contact.contactName + ' ' + contact.contactSurname;
        const productType = product.product_type;
        const existingProductType = pricePerProduct[0].series.find(item => item.name === productType);
        
          if(existingProductType){
            existingProductType.value = product.price;
          }else{
          // productsPerProducer[0].name = fullName;   
          pricePerProduct[0].series.push({name: product.name, value: product.price})
        
      }
      });
      console.log("calculatePricePerProduct", pricePerProduct)
      return pricePerProduct.map(entry =>{
        return{
          ...entry,
          series: entry.series.sort((a,b) => Number(a.name.split('-')[0]) - Number(b.name.split('-')[0]))
        }
      });
  }

  calculateInitialLettersData(contacts: any[]): any[] {
    return contacts.reduce((result: any[], contact) => {
      const initial = contact.surname.charAt(0).toUpperCase();
      if (result.find(item => item.name === initial)) {
        result.find(item => item.name === initial).value++;
      } else {
        result.push({ name: initial, value: 1 });
      }
      return result;
    }, []);
  }

  calculateContactsByFullNameData(contacts: any[]): any[]{
    const tempContactsByFullName= [{
      name: 'Contacts',
      series:<any[]> []
    }]
    contacts.forEach(contact=>{
      const fullName = contact.name + contact.surname + contact.lastname;
      const size = fullName.length;
      const range = `${size - (size % 5)} - ${size - (size % 5)+ 4} ch.`;
      const existingRange = tempContactsByFullName[0].series.find(item => item.name === range);
      if(existingRange){
        existingRange.value++;
      }else{
        tempContactsByFullName[0].series.push({name: range, value: 1})
      }
    });
    return tempContactsByFullName.map(entry =>{
      return{
        ...entry,
        series: entry.series.sort((a,b) => Number(a.name.split('-')[0]) - Number(b.name.split('-')[0]))
      }
    });
  }
  calculateProductsBySupplier(contacts: any[]): any[] {
    const productsBySupplier = new Map<string, number>();
  
    // Iterar sobre cada producto para calcular la cantidad total de productos por proveedor
    contacts.forEach(contact => {
      const fullName = contact.contactName + ' ' + contact.contactSurname;
    
      // Verificar si ya tenemos registros para este proveedor
      if (productsBySupplier.has(fullName)) {
        // Si ya existe, agregar el stock al total existente
        productsBySupplier.set(fullName, (productsBySupplier.get(fullName) ?? 0) + 1);
      } else {
        // Si no existe, establecer el stock como el total inicial
        productsBySupplier.set(fullName, 1);
      }
    });
    
    // Convertir el mapa en un formato adecuado para el gráfico de barras
    const chartData = Array.from(productsBySupplier.entries()).map(([name, value]) => {
      return { name: name, value: value };
    });
    
    // Ordenar los datos por nombre del proveedor
    chartData.sort((a, b) => a.name.localeCompare(b.name));
    
    console.log("calculateProductosBySupplier", chartData);
    return chartData;
  }

  calculateProductsPerSupplier(products: any[]): any[] {
    const productsBySupplier = new Map<string, number>();
  
    // Iterar sobre cada producto para calcular la cantidad total de productos por proveedor
    products.forEach(product => {
      const fullName = product.name + ' ' + product.surname;
      const stock = product.stock;
  
      // Verificar si ya tenemos registros para este proveedor
      if (productsBySupplier.has(fullName)) {
        // Si ya existe, agregar el stock al total existente
        productsBySupplier.set(fullName, productsBySupplier.get(fullName) + stock);
      } else {
        // Si no existe, establecer el stock como el total inicial
        productsBySupplier.set(fullName, stock);
      }
    });
  
    // Convertir el mapa en un formato adecuado para el gráfico de barras
    const chartData = Array.from(productsBySupplier.entries()).map(([name, value]) => {
      return { name: name, value: value };
    });
  
    // Ordenar los datos por nombre del proveedor
    chartData.sort((a, b) => a.name.localeCompare(b.name));
    console.log("calculateProductsPerSupplier", chartData)
    return chartData;
  }
  



formatAxisTick(value: number){
    // return Math.floor(value).toString();
    return value.toString();
  }
formatAxisTick2(value: number){
    return Math.floor(parseInt(value.toString()));
    // return value.toString();
  }

  
}