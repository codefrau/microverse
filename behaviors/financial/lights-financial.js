class LightPawn {
    setup() {
        console.log("LightPawn");
        let trm = this.service("ThreeRenderManager");
        let scene =  trm.scene;
        let camera = trm.camera;
        let group = this.shape;

        this.removeLights();

        let ambient = new Worldcore.THREE.AmbientLight( 0xffffff, .5 );
        group.add(ambient);
        this.lights.push(ambient);

        // let dir = new Worldcore.THREE.Vector3(-2, -0.15, -0);
        let directional = new Worldcore.THREE.DirectionalLight( 0xffffff, .5);
        directional.position.set(-10, 200, 10);
        this.lights.push(directional);
        group.add(directional);

        this.constructBackground(this.actor._cardData);

        // let moduleName = this._behavior.module.externalName;
        this.listen("updateShape", "updateShape");
    }

    removeLights() {
        if (this.lights) {
            this.lights.forEach((light) => {
                this.shape.remove(light);
            });
        }
        this.lights = [];
    }

    destroy() {
        console.log("destroy lights");
        if(this.background)this.background.dispose();
        this.removeLights();
    }

    updateShape(options) {
        this.constructBackground(options);
    }

    constructBackground(options) {
        let assetManager = this.service("AssetManager").assetManager;
        let dataType = options.dataType;
        if (!options.dataLocation) {return;}
        return this.getBuffer(options.dataLocation).then((buffer) => {
            return assetManager.load(buffer, dataType, Worldcore.THREE, options).then((texture) => {
                let TRM = this.service("ThreeRenderManager");
                let renderer = TRM.renderer;
                let scene = TRM.scene;
                let pmremGenerator = new Worldcore.THREE.PMREMGenerator(renderer);
                pmremGenerator.compileEquirectangularShader();

                let exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
                let exrBackground = exrCubeRenderTarget.texture;

                let bg = scene.background;
                let e = scene.environment;
                scene.background = exrBackground;
                scene.environment = exrBackground;
                if(e !== bg) if(bg) bg.dispose();
                if(e) e.dispose();
                texture.dispose();
            });
        });
    }
}

export default {
    modules: [
        {
            name: "FinantialLight",
            pawnBehaviors: [LightPawn]
        }
    ]
}

/* globals Worldcore */
