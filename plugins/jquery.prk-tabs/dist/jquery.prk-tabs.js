// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

        "use strict";

        var pluginName = "prkTabs",
            defaults = {
                navClass: 'prk-tabs',
                tabClass: 'tab',
                panelClass: 'panel',
                activeClass: 'active'
            };

        function Plugin ( element, options ) {
            this.element = element;
            this.settings = $.extend( {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;
            this.tabs = [];
            this.panels = [];

            this.init();
            
        }

        $.extend(Plugin.prototype, {
            init: function () {
                this.initTargetArrays(this.element, this.settings);
                this.initRoles(this.element, this.settings);
                this.initStates(this.element, this.settings);
                this.bindClicks(this.element, this.settings);
            },
            initTargetArrays: function() {
                // Map tabs to global array.
                this.tabs = $(this.element).children('a').map(function() {
                    return $(this);
                }).get();

                // Map panels to global array.
                this.panels = $(this.element).children('a').map(function() {
                    return $($(this).attr('href'));
                }).get();

            },
            initRoles: function() {

                // Add the role attribute if it does not exist.
                if ( !$(this.element).is('[role="tablist"]') ) {
                    $(this.element).attr('role', 'tablist');
                }
                // Apply the nav class.
                $(this.element).addClass(this.settings.navClass);

                for ( var i=0; i<this.tabs.length; i++ ) {

                    // Add the role attribute if it does not exist.
                    if ( !$(this.tabs[i]).is('[role="tab"]') ) {
                        $(this.tabs[i]).attr('role', 'tab');
                    }
                    // Apply the tab class.
                    $(this.tabs[i]).addClass(this.settings.tabClass);
                    // Set tabs' aria-controls attribute to it's href with the # stripped out.
                    $(this.tabs[i]).attr('aria-controls', $(this.tabs[i]).attr('href').split('#')[1]);
                    // Set the panels' aria-labelledby attribute to match the tab's ID attribute.
                    $($(this.tabs[i]).attr('href')).attr('aria-labelledby', $(this.tabs[i]).attr('id'));
                }

                for ( var x=0; x<this.panels.length; x++ ) {
                    // Apply the role attribute if it does not exist.
                    if ( !$(this.panels[x]).is('[role="tabpanel"]') ) {
                        $(this.panels[x]).attr('role', 'tabpanel');
                    }
                    // Add the panel class.
                    $(this.panels[x]).addClass(this.settings.panelClass);
                }

            },
            initStates: function() {

                // The initially active panel is either the first by default, or whatever ID is specified in the data-active-panel attribute.
                var activePanel = $(this.element).data('panel-active') !== undefined ?
                   $($(this.element).data('panel-active')) : $('#' + this.panels[0][0].id);
                // The intially active tab is ascertained by getting the active panel's area-labelledby attr value.   
                var activeTab = $('#' + activePanel.attr('aria-labelledby'));


                // Set the panel states
                activePanel.attr('aria-hidden', false)
                    .addClass(this.settings.activeClass);
                for ( var x=0; x<this.panels.length; x++ ) {
                    $(this.panels[x]).not(activePanel)
                        .attr('aria-hidden', true)
                        .removeClass(this.settings.activeClass);
                }

                
                // Set the tab states
                activeTab.attr('aria-selected', true)
                    .addClass(this.settings.activeClass);
                for ( var i=0; i<this.panels.length; i++ ) {
                    $(this.tabs[i]).not(activeTab)
                        .attr('aria-selected', false)
                        .removeClass(this.settings.activeClass);
                }

            },
            bindClicks: function() {
                var activeClass = this.settings.activeClass,
                    panels = this.panels;

                $(this.element).children('a')
                    .on('click', function(e) {
                        // Disable hash navigation - prevent window anchoring to target panel.
                        e.preventDefault();

                        // Update tab states.
                        $(this).attr('aria-selected', true)
                            .addClass(activeClass)
                            .siblings()
                            .attr('aria-selected', false)
                            .removeClass(activeClass);

                        // Update panel states.
                        var target = $($(this).attr('href'));
                        target.attr('aria-hidden', false)
                            .addClass(activeClass);
                        for ( var i=0; i<panels.length; i++ ) {
                            $(panels[i]).not(target)
                                .removeClass(activeClass)
                                .attr('aria-hidden', true);
                        }

                    });
            }
        });

        $.fn[ pluginName ] = function ( options ) {
            return this.each(function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                }
            });
        };

})( jQuery, window, document );
