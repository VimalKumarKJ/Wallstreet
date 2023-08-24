export const categories = [
    {
      name: 'Gameshots',
      image: 'https://i.imgur.com/ptWGR2kg.jpg',
    },
    {
      name: 'Movieshots',
      image: 'https://i.pinimg.com/736x/cd/76/f1/cd76f110ea51a9b50c629a4aceb02adf.jpg',
    },
    {
      name: 'Anime(Weeb)',
      image: 'https://r1.ilikewallpaper.net/iphone-12-pro-max-wallpapers/download-109660/Levi-Ackermann-Red-moon.jpg',
    },
    {
      name: 'Aesthetic',
      image: 'https://i.pinimg.com/736x/80/89/a7/8089a7cf4c069e6928201857591424bc.jpg',
    },
    {
      name: 'Minimilist',
      image: 'https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg',
    },
    {
      name: 'Space',
      image: 'https://i.pinimg.com/originals/81/f2/da/81f2da3049cd438f81f95a7a62b4cae0.jpg',
    },
    {
      name: 'Photography',
      image: 'https://wallpaperaccess.com/full/530366.jpg',
    },
    {
      name: 'Dev Assets',
      image: 'https://w0.peakpx.com/wallpaper/980/617/HD-wallpaper-coding-tag-hacker-programming-javascript-python-coder-software-coding-computer-science-css-web-design-html-linux-html5-programmer-laptop-tech-php-developer.jpg',
    }, 
    {
      name: 'Others',
      image: 'https://img.freepik.com/premium-photo/digital-art-selected-fluid-color_912214-276.jpg',
    },
  ];
  
  export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      } `;
  
  export const pinDetailQuery = (pinId) => {
    const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`;
    return query;
  };
  
  export const pinDetailMorePinQuery = (pin) => {
    const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };
  
  export const searchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
          image{
            asset->{
              url
            }
          },
              _id,
              destination,
              postedBy->{
                _id,
                userName,
                image
              },
              save[]{
                _key,
                postedBy->{
                  _id,
                  userName,
                  image
                },
              },
            }`;
    return query;
  };
  
  export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
  };
  
  export const userCreatedPinsQuery = (userId) => {
    const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };
  
  export const userSavedPinsQuery = (userId) => {
    const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };