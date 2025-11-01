Title: Using PDO Sum Function (Includes morris.js)
Date: 2018-12-07 14:00 10:00
Modified: 2025-08-11 22:59
Category: PHP Geliştirme
Tags: php, pdo
Slug: pdo-sum-fonksiyonu-kullanimi-morris-js
Authors: yuceltoluyag
Summary: Summing data in MySQL database using PDO and visualizing this data as graphs with morris.js.
Status: published
Template: article
Image: images/php_morris-xl.webp
Lang: en

Hello! We will discuss the use of a simple and effective function I discovered to get the sum of specific columns in a table on MySQL (phpMyAdmin). In addition, we will visualize this data using [morris.js](http://morrisjs.github.io/morris.js/){: target="\_blank" rel="noopener noreferrer"}, one of my favorite chart libraries. 🎨📊

## Data Collection

The following code will get the sum of **hesap_toplam** and **hesap_odenen** columns and create a chart.

### Sample Visualization

[responsive_img src="/images/php_morris-xl.webp" alt="Chart with PDO and Morris.js" /]

## Code

```php
Morris.Donut({
    element: 'morris-donut-chart',
    data: [
        <?php
        $kac_tane = $db->query("SELECT SUM(hesap_toplam) AS toplagel FROM hesaplar")->fetch();
        $kac_bane = $db->query("SELECT SUM(hesap_odenen) AS bulgel FROM hesaplar")->fetch();

        $toplam = $kac_tane['toplagel'];
        $cik    = $kac_bane['bulgel'];

        echo '{label: "Total Debts", value: '.$toplam.'},';
        echo '{label: "Total Payments", value: '.$cik.'}';
        ?>
    ]
});
```

## Explanations

- **SUM()** function sums all values in a specific column.
- **fetch()** method gets the result of the query and assigns it to variables.
- **Morris.js Donut** chart is used to visualize the acquired data as a graph.

### Result

After running the code, you will get a chart like the following:

[responsive_img src="/images/php_morris_grafik-xl.webp" alt="Morris.js Chart Example" /]

If you have any questions, you can leave a comment! 💬😊
