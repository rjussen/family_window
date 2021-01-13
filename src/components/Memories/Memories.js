import React, { useEffect, useState } from 'react'
import Amplify, { Storage } from 'aws-amplify'
import awsconfig from '../aws-exports'
import './Memories.css'
import Album from '../Album/Album'
import { useHistory } from 'react-router-dom'
import { filter } from 'jszip'
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

Amplify.configure(awsconfig)



function processStorageList(results) {
    const filesystem = {}
    // https://stackoverflow.com/questions/44759750/how-can-i-create-a-nested-object-representation-of-a-folder-structure
    const add = (source, target, item) => {
        const elements = source.split("/");
        const element = elements.shift();
        if (!element) return // blank
        target[element] = target[element] || { __data: item }// element;
        if (elements.length) {
            target[element] = typeof target[element] === "object" ? target[element] : {};
            add(elements.join("/"), target[element], item);
        }
    };
    results.forEach(item => add(item.key, filesystem, item));
    return filesystem
}

function iterate(obj, array) {
    let result = array;

    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
            iterate(obj[key], result)
        } else if (obj[key].toString().includes('file')) {
            let x = obj[key].toString()
            result.push(x)
        }
    })

    return result
}



function Memories() {
    const zoomOutProperties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        scale: 0.4,
        arrows: true
    };

    const [files, setFiles] = useState([])
    const [albums, setAlbums] = useState([{
        albumName: undefined,
        imglink: undefined
    }])
    const [holder, setHolder] = useState([])

    const history = useHistory();

    const handleClick = (album) => {
        const link = '/a/' + album
        history.push(link)
    }

    async function fetchAlbums() {
        let list = await Storage.list('')
        let filesystem = processStorageList(list)
        let subfilesystem = Object.entries(filesystem)
        let imgs = new Set()
        let result = iterate(subfilesystem, [])
        result.map(r => {
            imgs.add(r)
        })
        return imgs
    }

    async function makeAlbums() {
        let imgs = await fetchAlbums();
        let prevObject = undefined;
        imgs.forEach(i => {
            Storage.get(i)
                .then(result => {
                    let name = i.split('/')
                    let object = {
                        albumName: name[0],
                        imglink: result.toString()
                    }
                    let name1 = prevObject?.albumName
                    let name2 = object.albumName
                    prevObject = object
                    if (name1 != name2) {
                        setAlbums(oldArray => [...oldArray, object])
                    }

                })
        })
    }

    useEffect(() => {
        makeAlbums()
    }, [])



    return (

        <div className="memories" style={{ height: "80vh" }}>
                <Slide {...zoomOutProperties}>
                    {albums.slice(1).map((a, i) => {
                            return <Album delay={i} func={handleClick}
                                img={a.imglink} name={a.albumName} key={i} />
                    })}
                
                </Slide>

                {
                    // files.map((f, i) => (
                    //     <img key={i} src={f} alt="oi" />
                    // ))




                }
        </div>
    )
}

export default Memories