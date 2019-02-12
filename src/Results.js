import React from "react";
import Pet from "./Pet";
import pf from "petfinder-client";

const petfinder = pf({
  key: process.env.API_KEY, // Parcel does a find a replace
  secret: process.env.API_SECRET
});

class Results extends React.Component {

  constructor(props) {
    super(props);

    this.state = { // Our initial state is an empty array of pets - State can change.
      pets: []
    };
  }

  componentDidMount() {

    petfinder.pet
      .find({ location: "Miami, FL", output: "full" })
      .then(data => {

        let returnedPets;

        if (data.petfinder.pets && data.petfinder.pets.pet) {

          if (Array.isArray(data.petfinder.pets.pet)) {
            returnedPets = data.petfinder.pets.pet;
          } else {
            returnedPets = [data.petfinder.pets.pet];
          }

        } else {
          returnedPets = []
        }

        this.setState({
          pets: returnedPets
        });

    });

  }

  render() {
    return (
        <div className="search">
          {this.state.pets.map(pet => {

            // Some Animals have more than one breed
            let breed;
            if (Array.isArray(pet.breeds.breed)) {
              breed = pet.breeds.breed.join(", ");
            } else {
              breed = pet.breeds.breed;
            }
            return (
              <Pet
              key= {pet.id}
              animal= {pet.animal}
              name= {pet.name}
              breed= {breed}
              media= {pet.media}
              location= {pet.contact.city}
              id={pet.id} />
            )
          })}
        </div>

    );
  }
}

export default Results;

