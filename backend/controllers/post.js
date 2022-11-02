const Post = require('../models/Post')
const User = require('../models/User');
const fs = require('fs');

exports.createPost = (req, res, next) => {
   const postObject = req.body;
   delete postObject._id;
   const post = new Post({
       ...postObject,
       imageUrl: (typeof req.file !== 'undefined') ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
       likes: 0,
       usersLiked: [],
   });
   post.save()
   .then(() =>  res.status(201).json({message: 'Post enregistré !'}))
   .catch(error =>  res.status(400).json({message: "Problème d'enregistrement du post créé !"}))
};


exports.modifyPost = (req, res, next) => {
  const postObject = { ...req.body };
  console.log(req.params.id);
    Post.findOne({ _id: req.params.id})
        .then(post => {
            if ((post.userId == req.body.userId)) {
                Post.updateOne({_id: req.params.id}, { imageBase64: postObject.imageBase64, title: postObject.title})
                    .then(()=> res.status(200).json({message : 'Post modifiée !'}))
                    .catch(error => res.status(401).json({message : "Problème de mise à jour des données de votre post !" }));
            } else {
              User.findOne({ _id: req.body.userId, admin:true })
                .then ( user => {
                  console.log('user', user)
                  if(!user)throw 'non authentifié'
                  return Post.updateOne({_id: req.params.id}, {imageBase64: postObject.imageBase64, title: postObject.title})
                    .then(()=> res.status(200).json({message : 'Post modifié !'}))
                    .catch(error => res.status(401).json({message : "Problème de mise à jour des données de votre post !" }));
                })
                .catch(error => res.status(401).json({message: "Vous n'êtes pas autorisé à modifier le post "}))
            }
          })
        .catch(error =>
          {console.error(error)
          return res.status(400).json({ message: "Problème d'identification du post !" })
      })
    };

exports.deletePost = (req, res, next) => {
    const postObject = { ...req.body };
console.log(req.params.id);
    Post.findOne({ _id: req.params.id})
        .then(post => {
            if ((post.userId == req.body.userId)) {
                Post.deleteOne({_id: req.params.id})
                    .then(()=> res.status(200).json({message : 'Post supprimé !'}))
                    .catch(error => res.status(401).json({message : "Problème de suppression des données de votre post !" }));
            } else {
              User.findOne({ _id: req.body.userId, admin:true })
                .then ( user => {
                  console.log('user', user)
                  if(!user)throw 'non authentifié'
                  return Post.deleteOne({_id: req.params.id})
                    .then(()=> res.status(200).json({message : 'Post modifiée !'}))
                    .catch(error => res.status(401).json({message : "Problème de suppression de votre post !" }));
                })
                .catch(error => res.status(401).json({message: "Vous n'êtes pas autorisé à supprimer le post "}))
            }
          })
        .catch(error =>
          {console.error(error)
          return res.status(400).json({ message: "Problème d'identification du post !" })
      })
    };

// exports.deletePost =  (req, res, next)=>{
// if(req.body.userId == Post.userId) {
//    Post.deleteOne({_id: req.params.id})
//             .then(() => { res.status(200).json({message: 'Post supprimé !'})})
//             .catch( error => res.status(401).json({ message : "Problème pour récupérer le post à suppprimer !" }));
// }
// };

exports.getAllPosts = (req, res, next)=> {
  Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({message : "Problème de récupération de l'ensemble des posts !"}))
};

exports.like = (req, res, next) => {
    if (req.body.likes === 1) {
        Post.updateOne({_id: req.params.id}, {
          $inc: {likes: +1},
          $push:
            { usersLiked: req.body.userId }})
            .then(post => res.status(200).json({message: 'Like ajouté !'}))
            .catch(error => res.status(400).json({message: "Problème d'ajout du like !"}))
    } else {
        Post.findOne({ _id: req.params.id })
            .then(post => {
                if (post.usersLiked.includes(req.body.userId)) {
                    Post.updateOne({ _id: req.params.id },
                      { $pull: {
                    usersLiked: req.body.userId},
                    $inc: {likes: -1 }})
                        .then(post => { res.status(200).json({message: 'Like supprimé !'}) })
                        .catch(error => res.status(400).json({message: "Problème de suppression du like !"}))
                }})
            .catch(error => res.status(400).json({ message: "Problème d'identification du post pour le vote !" }))
    }
};
