'use strict'

import Input from "./input.js"
class AppState
{

    constructor( app )
    {

        this.app = app
        this.is_selecting = false

        // get list of ui indicators
        this.ui_categories = {

            "camera_mode":
            {

                "fps": document.getElementById( "fpsCamMode" ),
                "stationary": document.getElementById( "statCamMode" )

            },
            "projection_mode":
            {

                "perspective": document.getElementById( "perspProjMode" ),
                "orthographic": document.getElementById( "orthoProjMode" )

            },
            "selection":
            {

                "raycasting": document.getElementById( "selectionRaycasting" ),
                "target": document.getElementById( "selectionTarget" )

            },
            "shading":
            {

                "wireframe": document.getElementById( "wireframeShading" ),
                "flat": document.getElementById( "flatShading" ),
            }

        }

        // update ui with default values
        this.updateUI( "camera_mode", "stationary" )
        this.updateUI( "shading", "flat" )
        this.updateUI( "projection_mode", "perspective" )
        this.updateUI( "selection", "target" )

    }

    /**
     * Updates the app state by checking the input module for changes in user input
     */
    update( )
    {

        // TODO check user input using the input module and create appropriate handlers to manipulate the canvas
        if(Input.isKeyDown("2"))
        {
            this.updateUI("shading", "flat")
        }
        else if(Input.isKeyDown("1"))
        {
            this.updateUI("shading", "wireframe")
        }
        else if(Input.isKeyDown("t"))
        {
            this.updateUI("selection", "target")
        }
        else if(Input.isKeyDown("r"))
        {
            this.updateUI("selection", "raycasting")
        }
        else if(Input.isKeyDown("p"))
        {
            this.updateUI("projection_mode", "perspective")
        }
        else if(Input.isKeyDown("o"))
        {
            this.updateUI("projection_mode", "orthographic")
        }
        else if(Input.isKeyDown("f"))
        {
            this.updateUI("camera_mode", "fps")
        }
        else if(Input.isKeyDown("s"))
        {
            this.updateUI("camera_mode", "stationary")
        }
        // TODO don't forget to update the ui as seen in the constructor to tell the ui what mode you're in

    }

    /**
     * Updates the ui to represent the current interaction
     * @param { String } category The ui category to use; see this.ui_categories for reference
     * @param { String } name The name of the item within the category
     * @param { String | null } value The value to use if the ui element is not a toggle; sets the element to given string 
     */
    updateUI( category, name, value = null )
    {

        for ( let key in this.ui_categories[ category ] )
        {

            this.updateUIElement( this.ui_categories[ category ][ key ], key == name, value )

        }

    }

    /**
     * Updates a single ui element with given state and value
     * @param { Element } el The dom element to update
     * @param { Boolean } state The state (active / inactive) to update it to
     * @param { String | null } value The value to use if the ui element is not a toggle; sets the element to given string 
     */
    updateUIElement( el, state, value )
    {

        el.classList.remove( state ? "inactive" : "active" )
        el.classList.add( state ? "active" : "inactive" )

        if ( state && value != null )
            el.innerHTML = value

    }

}

export default AppState
