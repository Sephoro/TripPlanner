'using strict'

$(document).ready(function () {
  $('#button1').click(function () {
    $('#Travel').hide()
    $('#Travel1').hide()
    $('#Travel2').hide()
    $('#Header').html('<strong>Trending places in Africa</strong>')
    $('#row').after('<br><div class="container"><div class="row"><div class="col text-center"><button id="button_1" class="btn btn-primary">Back</button></div></div></div>')

    $('#row').after('<br id="br_" >')
    $('#br_').after('<div id = "id_1" class="container-fluid bg-3">' + '<div class="row">' +

                     '<div class="col-sm">' +
                     '<div id="Travel" class="card" style="width:220px">' +
                     '<img class="card-img-top" src="/cdn/images/Madagascar.jpg" alt="Card image" style="width:100%">' +
                     '<div class="card-body">' +
                     '<h4 class="card-title">1. Madagascar</h4>' +
                     '<p class="card-text">Lemurs, baobabs, rainforest, desert, hiking and diving: Madagascar is a dream destination for outdoors enthusiasts – half the fun is getting to all these incredible attractions.</p>' +
                     '</div>' +
                     '</div>' +
                     '</div>' +

                     '<div class="col-sm">' +
                     '<div id="Travel1" class="card" style="width:220px">' +
                     '<img class="card-img-top" src="/cdn/images/Essaouira-Morocco-1.jpg" alt="Card image" style="width:100%">' +
                     '<div class="card-body">' +
                     '<h4 class="card-title">2. Essaouira Morocco</h4>' +
                     '<p class="card-text">Morocco is a vibrant and beautiful country to visit. Each city has its own character and a certain Moroccan charm.You’ll fall in love with the lively medina of Jemaa el fna, with its bright stalls and fresh orange juice stands.</p>' +
                     '</div>' +
                     '</div>' +
                     '</div>' +

                     '<div class="col-sm">' +
                     '<div id="Travel2" class="card" style="width:220px">' +
                     '<img class="card-img-top" src="/cdn/images/Seychelles.jpg" alt="Card image" style="width:100%">' +
                     '<div class="card-body">' +
                     '<h4 class="card-title">3. Seychelles</h4>' +
                     '<p class="card-text">The attraction of holidaying in the Seychelles Islands lies in their pristine, unspoilt beauty, with diving, fishing and water sports topping the list of popular activities. The Seychelles beaches are known for being among the best in the world</p>' +
                     '</div>' +
                     '</div>' +
                     '</div>' +

                     '<div class="col-sm">' +
                     '<div id="Travel3" class="card" style="width:220px">' +
                     '<img class="card-img-top" src="/cdn/images/Durban.jpg" alt="Card image" style="width:100%">' +
                     '<div class="card-body">' +
                     '<h4 class="card-title">4. Durban, Kwazulu-Natal</h4>' +
                     '<p class="card-text">Durban has a much more authentic feel than other South African cities, giving you a chance to experience a bit of the real South Africa. Making it one of the best places in Africa to visit.</p>' +
                     '</div>' +
                     '</div>' +
                     '</div>' +

                     '<div class="col-sm">' +
                     '<div id="Travel3" class="card" style="width:220px">' +
                     '<img class="card-img-top" src="/cdn/images/Drakensberg.jpg" alt="Card image" style="width:100%">' +
                     '<div class="card-body">' +
                     '<h4 class="card-title">5. Drakensberg</h4>' +
                     '<p class="card-text">The Drakensberg offers you a host of holiday pursuits and superb accommodation. Here you’ll find fine cuisine and excellent conference and wedding facilities. Sports enthusiasts can indulge in a multitude of activities ranging from horse riding and fishing to high adrenalin sports including quad biking, paintball and canopy tours</p>' +
                     '</div>' +
                     '</div>' +
                     '</div>' +

                     '</div>' +
                     '</div>'
    )
    $('#button_1').click(function () {
      $('#button_1').hide()
      $('#id_1').hide()
      $('#Header').html('<strong>TRENDING PLACES</strong>')
      $('#Travel').show()
      $('#Travel1').show()
      $('#Travel2').show()
    })
  })
})

$(document).ready(function () {
  $('#button2').click(function () {
    $('#Travel').hide()
    $('#Travel1').hide()
    $('#Travel2').hide()
    $('#Header').html('<strong>Trending places in North America</strong>')
    $('#row').after('<br><div class="container"><div class="row"><div class="col text-center"><button id="button_2" class="btn btn-primary">Back</button></div></div></div>')

    $('#row').after('<br id="br_" >')
    $('#br_').after('<div id="id_2" class="container-fluid bg-3">' + '<div class="row">' +

                     '<div class="col-sm">' +
                     '<div id="Travel" class="card" style="width:220px">' +
                     '<img class="card-img-top" src="/cdn/images/Grand.jpg" alt="Card image" style="width:100%">' +
                     '<div class="card-body">' +
                     '<h4 class="card-title">1. America’s urban beach, Miami</h4>' +
                     '<p class="card-text">At the southern tip of the Miami Beach barrier island is funky South Beach. Wannabe models parade along Ocean Drive; clubs on Collins Avenue rock till dawn; the beach itself is broad and sandy.</p>' +
                     '</div>' +
                     '</div>' +
                     '</div>' +

                     '<div class="col-sm">' +
                     '<div id="Travel1" class="card" style="width:220px">' +
                     '<img class="card-img-top" src="/cdn/images/Cayman.jpg" alt="Card image" style="width:100%">' +
                     '<div class="card-body">' +
                     '<h4 class="card-title">2. Hollywood, California</h4>' +
                     '<p class="card-text">Learn more on a day-long sightseeing tour that takes in Tinseltown highlights, from celebrities’ homes in Beverly Hills to Hollywood’s Walk of Fame.</p>' +
                     '</div>' +
                     '</div>' +
                     '</div>' +

                     '<div class="col-sm">' +
                     '<div id="Travel2" class="card" style="width:220px">' +
                     '<img class="card-img-top" src="/cdn/images/Skydeck.jpg" alt="Card image" style="width:100%">' +
                     '<div class="card-body">' +
                     '<h4 class="card-title">3. Skydeck Chicago</h4>' +
                     '<p class="card-text">In Willis Tower’s Skydeck Chicago on the 103rd floor, you’ll see breathtaking views of all the incredible architecture Chicago has to offer. In fact, it’s possible that on a sunny day, you may even see Indiana, Michigan, and Wisconsin, too.</p>' +
                     '</div>' +
                     '</div>' +
                     '</div>' +

                     '<div class="col-sm">' +
                     '<div id="Travel3" class="card" style="width:220px">' +
                     '<img class="card-img-top" src="/cdn/images/Las_Vegas.jpg" alt="Card image" style="width:100%">' +
                     '<div class="card-body">' +
                     '<h4 class="card-title">4. Showbiz, Las Vegas, Nevada</h4>' +
                     '<p class="card-text">Want to see the stars? Head for Vegas. From Rihanna and Britney to Elton John and Lionel Richie, the big names strut their stuff here. But the 30 or so live shows each night also feature tributes, such as The Beatles LOVE and Michael Jackson ONE, plus David Copperfield, medieval jousting and nudge-nudge burlesque</p>' +
                     '</div>' +
                     '</div>' +
                     '</div>' +

                     '<div class="col-sm">' +
                     '<div id="Travel3" class="card" style="width:220px">' +
                     '<img class="card-img-top" src="/cdn/images/Nigeria.jpg" alt="Card image" style="width:100%">' +
                     '<div class="card-body">' +
                     '<h4 class="card-title">5. Nigeria Falls</h4>' +
                     '<p class="card-text">Niagra Falls straddles the border between Canada and the United States and is a famous tourist destination, rich with history and known for its magnificent natural beauty (and waterfall mist, of course).</p>' +
                     '</div>' +
                     '</div>' +
                     '</div>' +

                     '</div>' +
                     '</div>'
    )
    $('#button_2').click(function () {
      $('#button_2').hide()
      $('#id_2').hide()
      $('#Header').html('<strong>TRENDING PLACES</strong>')
      $('#Travel').show()
      $('#Travel1').show()
      $('#Travel2').show()
    })
  })
})

$(document).ready(function () {
  $('#button3').click(function () {
    $('#Travel').hide()
    $('#Travel1').hide()
    $('#Travel2').hide()
    $('#Header').html('<strong>Trending places in South America</strong>')
    $('#row').after('<br><div class="container"><div class="row"><div class="col text-center"><button id="button_3" class="btn btn-primary">Back</button></div></div></div>')

    $('#row').after('<br id="br_" >')
    $('#br_').after('<div id="id_3" class="container-fluid bg-3">' + '<div class="row">' +

                     '<div class="col-sm">' +
                     '<div id="Travel" class="card" style="width:220px">' +
                     '<img class="card-img-top" src="/cdn/images/Colombia.jpg" alt="Card image" style="width:100%">' +
                     '<div class="card-body">' +
                     '<h4 class="card-title">1. Cartagena, Colombia</h4>' +
                     '<p class="card-text">Stunning beaches, cobblestone streets and brightly colored buildings – this Colombian destination on the lovely Caribbean coast has all the hallmarks of a fantastic South American break</p>' +
                     '</div>' +
                     '</div>' +
                     '</div>' +

                     '<div class="col-sm">' +
                     '<div id="Travel1" class="card" style="width:220px">' +
                     '<img class="card-img-top" src="/cdn/images/Amazon.jpg" alt="Card image" style="width:100%">' +
                     '<div class="card-body">' +
                     '<h4 class="card-title">2. Amazon Rainforest</h4>' +
                     '<p class="card-text">There’s no place on earth quite like the Amazon Rainforest. Known as the world’s largest tropical rainforest and the earth’s last frontier, it’s definitely one awesome, mind-boggling piece of real estate, covering 75 percent of the Amazon River basin and home to 390 billion trees</p>' +
                     '</div>' +
                     '</div>' +
                     '</div>' +

                     '<div class="col-sm">' +
                     '<div id="Travel2" class="card" style="width:220px">' +
                     '<img class="card-img-top" src="/cdn/images/Sao.jpg" alt="Card image" style="width:100%">' +
                     '<div class="card-body">' +
                     '<h4 class="card-title">3. Sao Paulo, Brazil </h4>' +
                     '<p class="card-text">Sao Paulo – the largest city in all of South America – boasts a titillating cuisine and a booming art scene that are just as multi-national as its wondrous population of more than 9 million people. With Jardins district’s restaurants serving all kinds of food imaginable, you won’t be out of place going to this city, just for dining</p>' +
                     '</div>' +
                     '</div>' +
                     '</div>' +

                     '<div class="col-sm">' +
                     '<div id="Travel3" class="card" style="width:220px">' +
                     '<img class="card-img-top" src="/cdn/images/Galapagos.jpg" alt="Card image" style="width:100%">' +
                     '<div class="card-body">' +
                     '<h4 class="card-title">4. The Galapagos Islands, Ecuador</h4>' +
                     '<p class="card-text">The Galapagos is by far the ultimate paradise for animal lover. After all, this archipelago is arguably the place in the world where man continues to respect Mother Nature’s boundaries and wild creatures prosper without fear of human beings</p>' +
                     '</div>' +
                     '</div>' +
                     '</div>' +

                     '<div class="col-sm">' +
                     '<div id="Travel3" class="card" style="width:220px">' +
                     '<img class="card-img-top" src="/cdn/images/Bogota.jpg" alt="Card image" style="width:100%">' +
                     '<div class="card-body">' +
                     '<h4 class="card-title">5. Bogota, Colombia</h4>' +
                     '<p class="card-text">Set high in the Andes, Colombia’s capital has seen a renaissance in its tourism for the past few years. See invaluable treasures at the Gold Museum, gorgeous flora at Bogota Botanical Garden and superb works of art at the Museo Botero</p>' +
                     '</div>' +
                     '</div>' +
                     '</div>' +

                     '</div>' +
                     '</div>'
    )
    $('#button_3').click(function () {
      $('#button_3').hide()
      $('#id_3').hide()
      $('#Header').html('<strong>TRENDING PLACES</strong>')
      $('#Travel').show()
      $('#Travel1').show()
      $('#Travel2').show()
    })
  })
})
