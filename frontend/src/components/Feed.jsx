import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom' //what are the currently passed parameters
import {client} from '../client'
import MasonryLayout from './MasonryLayout'
import { feedQuery, searchQuery } from '../Utils/data'
import Spinner from './Spinner'

const confused = 'https://i.gifer.com/7VE.gif'

const Feed = () => {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(null)
  const {categoryId} = useParams()

  useEffect(() => {
    setLoading(true)
    if(categoryId){
      const query = searchQuery(categoryId)
      client.fetch(query)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
    }else{
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
    }
  }, [categoryId])
  if(!pins?.length) return <div className="flex justify-center items-center"><img src={confused} alt="confused"/><h2>void 404</h2></div>
  if(loading) return <Spinner message="Wait a sec! We are creating your Wall" />
  return (
    <div>
      {pins && <MasonryLayout pins = {pins} />}
    </div>
  )
}

export default Feed