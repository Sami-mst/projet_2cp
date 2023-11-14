/* const Thing=require('../models/thing')

exports.Showthings=(req,res,next)=>{
    Thing.find()
        .then((objet)=>res.status(200).json(objet))
        .catch((error)=>res.status(400).json(error));
}
exports.ShowOneThing=(req,res,next)=>{
    Thing.findOne({_id:req.params.id})
        .then(thing=>res.status(200).json(thing))
        .catch(error=>res.status(404).json( {error} ));
}
exports.PostOne=(req,res,next)=>{
    console.log(req.body);
    delete req.body._id;
    const thing=new Thing(req.body
    )
    thing.save()
        .then(()=>res.status(201).json({message:"good!"}))
        .catch(()=>res.status(400).json({message:"bad :("}))
}
exports.UpdateOne=(req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body , _id:req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }
exports.DeleteOne=(req,res,next)=>{
    Thing.deleteOne({_id:req.params.id})
        .then(()=>res.status(200).json({message:"done"}))
        .catch(error => res.status(400).json({error }))
} */