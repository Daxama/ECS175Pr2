'use strict'

import Input from "./input.js"
import Shader from "./shader.js"
import AppState from "./appstate.js"
import ObjectNode from "./object.js"

class App
{

    constructor( scene )
    {

        console.log( "Initializing App" )

        // canvas & gl
        this.canvas = document.getElementById( "canvas" )
        this.canvas.addEventListener( "contextmenu", event => event.preventDefault( ) );
        this.gl = this.initGl( )

        // save the scene
        this.scene = scene

        // shaders
        // TODO create and load shaders here
        console.log("Loading Shaders")
        this.wire = new Shader(this.gl, "../shaders/wireframe.vert.glsl", "../shaders/wireframe.frag.glsl")
        //this.flat = new Shader(this.gl, "../shaders/flat.vert.glsl", "../shaders/flat.frag.glsl")

        // movement
        // TODO if you choose to use movement.js to handle your movement interactions, create an instance here

        // resize handling
        this.resizeToDisplay( )
        this.initial_width = this.canvas.width
        this.initial_height = this.canvas.heigh
        window.onresize = this.resizeToDisplay.bind( this )

        // app state
        this.app_state = new AppState( this )
    }

    /** 
     * Resizes camera and canvas to pixel-size-corrected display size
     */
    resizeToDisplay( )
    {
        const dpr = window.devicePixelRatio;
        const
        {
            width,
            height
        } = canvas.getBoundingClientRect();

        let scaledWidth = Math.round( width * dpr )
        let scaledHeigth = Math.round( height * dpr )

        this.canvas.width = scaledWidth
        this.canvas.height = scaledHeigth
        // TODO handle window resizes
        
    }

    /**
     * Initializes webgl2 with settings
     * @returns { WebGL2RenderingContext | null }
     */
    initGl( )
    {

        // TODO implement

        let gl = this.canvas.getContext("webgl2")

        if(!gl)
        {
            throw Error("Could not initialize WebGL2")
        }

        return gl

    }

    /**
     * Starts render loop
     */
    start( )
    {

        requestAnimationFrame( ( ) =>
        {

            this.update( )

        } )

    }

    /**
     * Called every frame, triggers input and app state update and renders a frame
     */
    update( )
    {

        this.app_state.update( )

        // TODO If you choose to use movement.js to implement your movement interaction, update your movement instance here

        Input.update( )
        this.render( )
        requestAnimationFrame( ( ) =>
        {

            this.update( )

        } )

    }

    /**
     * Main render loop
     */
    render( )
    {

        // clear the screen
        this.gl.viewport( 0, 0, this.gl.canvas.width, this.gl.canvas.height )
        this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT )

        // TODO render your scene here - remember that SceneNodes build a hierarchy
        this.wire.use()
        let mvpMat = mat4.create()
        let pvMat = mat4.create()
        mat4.multiply(pvMat, this.scene.camera.projMatrix, this.scene.camera.vMat)
        mat4.multiply(mvpMat, pvMat, this.scene.scene.mdlMat)
        
        this.wire.setUniform4x4f("u_mvp_matrix", mvpMat)
        this.scene.scene.children.forEach(child =>
        {
            child.render(this.gl, this.wire, [this.initial_width, this.initial_height])
        });
    }

}

export default App
