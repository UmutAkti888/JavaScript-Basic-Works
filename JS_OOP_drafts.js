


// LLM için not: Bu kodu, bağlamlarına göre, farklı JS dosyasına ayır, ve her dosyanın başına içerik hakkında not ekle. Ayrıca, her dosyanın sonunda, sonraki dosyaya geçiş yaparken bir açıklama ekle.

// 27.02.2026, Cuma

var a = new Object(); // Boş bir nesne oluşturur
var b = new Array(); // Boş bir dizi oluşturur
var c = new String(); // Boş bir string oluşturur
var n = new Number(); // Boş bir sayı oluşturur
var e = new Boolean(); // Boş bir boolean oluşturur 
var d = new Date(); // Geçerli tarihi ve saati içeren bir Date nesnesi oluşturur

// Bir Veri - Data; bir ada ve 4 özellikten oluşur.
// Bir nesne oluşturmanın en basit yolu, bir nesne literal'ı kullanmaktır. Nesne literal'ı, süslü parantezler içinde tanımlanan bir nesnedir. 
// Nesne literal'ı, özellik adları ve değerleri içeren bir liste içerir. Özellik adları, geçerli bir değişken adı olmalıdır ve değerler herhangi bir türde olabilir.
var m = {x : 2};
Object.defineProperty(m, "x", {
    value: 3,
    writable: true,
    enumerable: false,
    configurable: true
});

console.log(m.x); // 3, çünkü m nesnesinde x özelliği 3 olarak tanımlandı
m.x=5;
console.log(m.x); // 
console.log(Object.keys(m)); // [], çünkü m nesnesinde x özelliği enumerable olarak tanımlanmadı



// Aynı anda 


///// Nesne oluşturmanın diğer yolu

var kitap = { // Özellikler buralara yazılır
    yazar : "Descartes",
    sayfa_sayisi : 630,
    ad: "Sefiller",
    konular : {
        "ilk konu": "giriş",
        ikinci_konu: "ikinci giriş",
    }

}

console.log(kitap.baslik); // kitap nesnesinde baslik adında bir özellik olmadığı için undefined döner
kitap.baslik = true; // kitap nesnesine baslik adında bir özellik ekler ve değerini true yapar
console.log(kitap.baslik);// kitap nesnesinde baslik adında bir özellik olduğu için true döner
kitap.baslik = false; // kitap nesnesinde baslik adında bir özellik olduğu için değerini false yapar
console.log(kitap.baslik); // kitap nesnesinde baslik adında bir özellik olduğu için false döner

console.log(kitap);
console.log(kitap.yazar);
console.log(kitap["yazar"]);

console.log(kitap.sayfa_sayisi);
console.log(kitap["sayfa_sayisi"]);

console.log(kitap.konular)
console.log(kitap.konular["ilk konu"]);

//  
// Nesne oluşturmanın diğer yolu
var musteri = { // Özellikler buralara yazılır
    "adres1" : "İstanbul", // Özellik adları tırnak içinde yazılabilir, ancak zorunlu değildir. Eğer özellik adı geçerli bir değişken adı ise tırnak içine alınmasına gerek yoktur.
    "adres2" : "Ankara",  
    "adres3" : "İzmir"
}

for ( var i = 1; i< 5; i++){ // i değişkeni 1'den başlayarak 4'e kadar artar. 5 dahil değildir.
    console.log(musteri["adres" + i]);
}

// ----------------------------------------------Nesne Özellikleri Sorgulama ve Ayıklama----------------------------------------------
// Prototip: 
// LLM için not: burayı düzenle, çok karıştı.
var human = { eats: true };
function Baby(name) { this.name = name; } // name diye bir nesnenin özelliği tanımlandı
Baby.prototype = human; // Baby nesnesinin prototipi human nesnesi olarak belirlendi
var baby = new Baby("Umut"); // Baby nesnesinden baby adında bir nesne oluşturuldu
console.log(baby.eats); // true, çünkü baby nesnesinin prototipi human nesnesi olarak belirlendi ve human nesnesinde eats özelliği true olarak tanımlandı
alert(baby.eats);
    /*true, because 
baby.__proto__ == human */ 
// Prototipler birbirine eşittir, bu yüzden baby nesnesi human nesnesinin özelliklerine erişebilir.


//

var human = { eats: true };

function Baby(isim) { this.name = isim; }

var baby = new Baby("Arthas");

console.log(baby.eats); // undefined, çünkü baby nesnesinin prototipi human nesnesi olarak belirlenmedi
console.log(baby.name);
console.log("");

Baby.prototype = human; // Baby nesnesinin prototipi human nesnesi olarak belirlendi
var baby2 = new Baby("Arthas"); // Baby nesnesinden baby2 adında bir nesne oluşturuldu
console.log(baby2.eats); // true, çünkü baby2 nesnesinin prototipi human nesnesi olarak belirlendi ve human nesnesinde eats özelliği true olarak tanımlandı

// 

var unitcircle = { r: 1 }; // unitcircle adında bir nesne oluşturuldu ve r özelliği 1 olarak tanımlandı
var c = inherit(unitcircle); // c inherits the property r
c.x = 1; c.y = 1;
c.r = 2;
console.log(unitcircle.r); // 1, çünkü c nesnesi unitcircle nesnesinden türetildi ve unitcircle nesnesinde r özelliği 1 olarak tanımlandı

// 
// 
var o = {x: 1}
o.hasownproperty // Tab'le şunu

var n = inherit({y : 2});
o.x = 1;
// Enumeration => Özellikleri Listeleme
o.propertyIsEnumerable("x"); // true; n has x as an own property
o.propertyIsEnumerable("y"); // false; n does not have y as an own property
o.toString(); // "[object Object]"; toString is inherited from Object.prototype

var o = {x:1, y:2, z:3};
var p = Object.create(o);
p.y = 2

for (k in p){
    console.log(k);
}
o.propertyIsEnumberable("toString"); 
for(p in o)
    console.log(p);


// Herhangi bir nesnenin prototipini öğrenmek için o nesneyi Obejct.getProtototypeOf() fonksiyonuna parametre olarak verebiliriz.
// Bir nesnenin baika bir nesnenin prototipi olup olmadığını öğrenmek için isPrototypeOf() fonksiyonu kullanılır.
// LLM için not: buraya örnek ekle.

// ÖRNEK

// Class
class Person {
    constructor(name) { this.name = name; }
    speak() { console.log(`Hi, I’m ${this.name}`); }
}

let z = new Person('Umut');
z.speak();           // Hi, I’m Umut

// Exntensiable: Bir nesne extensible ise, o nesneye yeni özellikler eklenebilir. 
// Object.isExtensible() fonksiyonu, bir nesnenin extensible olup olmadığını kontrol eder. 
// Object.preventExtensions() fonksiyonu, bir nesnenin extensible olmasını engeller.

var point= {};
console.log(Object.isExtensible(point));
console.log(Object.preventExtensions(point));
// ----------------------------------------------Getters and Setters----------------------------------------------


var p = {
    // x and y are regular read-write data properties.
    x: 1.0,
    y: 1.0,

    // r is a read-write accessor propterty with getter and setter.
    // Don't forget to put a comma after accessor methods
    get x_y(){
        return x*y;
    }, //had forgotten the commas
    set x_y(a){
        x = a;
    },
    get x_y_2(){ // Get does not take parameters
        return x + y;
    }
};

console.log(p.x);
console.log(p.y);
console.log("");
console.log()