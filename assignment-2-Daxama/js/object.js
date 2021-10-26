'use strict'

import SceneNode from "./scenenode.js";

class ObjectNode extends SceneNode
{

    constructor( vbo_data, name, parent, translation = vec3.create( ), rotation = vec3.create( ), scale = vec3.fromValues( 1, 1, 1 ) )
    {

        super( name, parent, translation, rotation, scale )

        this.vbo_data = new Float32Array( vbo_data )
        this.vbo = null

    }

    update( )
    {

        super.update( )

        // TODO Make any updates to your object here

    }

    createBuffers( gl )
    {
        this.vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo)
        gl.bufferData(gl.ARRAY_BUFFER, this.vbo_data, gl.STATIC_DRAW);
        console.log(this.vbo_data.length)
        this.vbo.itemSize = 3;
        this.vbo.numItems = this.vbo_data.length/9;
        // TODO Create your VBO buffer here and upload data to the GPU
    }

    render( gl, shader )
    {

        if ( this.vbo == null )
            this.createBuffers( gl )
        let stride = 3*3*4;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo)
        //below is for the position vertex
        gl.vertexAttribPointer(shader.getAttributeLocation("a_position"), this.vbo.itemSize, gl.FLOAT, false, stride, 0);
        gl.enableVertexAttribArray(shader.getAttributeLocation("a_position"))
        // TODO Link your VBO to your shader variables here
        // TODO Remember that your VBO contains not only vertex data but also colors and normals - chose stride and offset appropriately
        gl.drawArrays(gl.TRIANGLES, 0, this.vbo.numItems)
        // TODO Call drawArrays to draw the geometry

    }
}

export default ObjectNode
