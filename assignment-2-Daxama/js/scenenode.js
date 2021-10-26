'use strict'

class SceneNode
{

    constructor( name, parent, translation = vec3.create( ), rotation = vec3.create( ), scale = vec3.fromValues( 1, 1, 1 ) )
    {
        this.trnslMat = mat4.create()
        this.type = "node"
        this.name = name
        this.translation = translation
        this.rotation = rotation
        this.scale = scale

        // TODO Create the transformation matrix for this node based on the translation, rotation, and scale you got
        this.mdlMat = mat4.create();
        mat4.fromTranslation(this.trnslMat, this.translation)
        mat4.rotate(this.mdlMat, this.mdlMat, 0, this.rotation)
        mat4.scale(this.mdlMat, this.mdlMat, this.scale)
        this.parent = parent
        this.children = [ ]

    }

    /**
     * Performs any updates if necessary
     */
    update( )
    {

        // TODO Make any updates to your node here (e.g., change transformation)

    }

    /**
     * Gives the transform of this node
     * @returns The transformation of this node
     */
    getTransform( )
    {

        // TODO Return the transformation describing the object -> world transformation for this node

        return

    }

    /**
     * Renders this node; Note that by default scene note does not render as it has no context
     * @param { WebGL2RenderingContext } gl The WebGL2 rendering context for this app
     * @param { Shader } shader The shader to use for rendering
     */
    render( gl, shader )
    {

        return

    }

}

export default SceneNode
