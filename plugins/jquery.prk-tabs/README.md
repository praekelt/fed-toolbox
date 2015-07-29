#jquery.prk-tabs
A progressively enhanced, WAI-ARIA compliant tab system for use in Praekelt projects. 

This plugin does not include styles - just functionality.

##Demo
You can see the tabs in action in the `demo/` folder.

##Initialisation
Grab `jquery.prk-tabs.min.js` from the `dist/` folder and instantiate it with `$('selector').prkTabs();`

###Plugin Options
The default plugin options are:
```
$('selector').prkTabs({
    navClass: 'prk-tabs',
    tabClass: 'tab',
    panelClass: 'panel',
    activeClass: 'active'
});
```

###Explicitly setting the active tab on load
You can set which tab is active on load by adding the following data-attribute:
```
<nav class="tabs-example" data-panel-active="#panel2">
```

##Example
```
<nav class="tabs-example" data-panel-active="#panel2">
    <a href="#panel1" id="tab1">Tab 1</a>
    <a href="#panel2" id="tab2">Tab 2</a>
    <a href="#panel3" id="tab3">Tab 3</a>
</nav>

<article id="panel1">
    <h1>Panel 1</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu scelerisque eros.</p>
</article>

<article id="panel2">
    <h1>Panel 2</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu scelerisque eros.</p>
</article>

<article id="panel3">
    <h1>Panel 3</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu scelerisque eros.</p>
</article>

<script>
        $(function() {
            $('.tabs-example').prkTabs({
                navClass: 'prk-tabs',
                tabClass: 'tab',
                panelClass: 'panel',
                activeClass: 'active'
            });
        });
</script>
```

