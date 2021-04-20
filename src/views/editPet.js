//@ts-check
import { html } from "../../node_modules/lit-html/lit-html.js";

import { getPetById, updatePet } from "../api/data.js";

const editTemplate = (pet, onSubmit) => html`<section id="edit-page" class="edit">
    <form id="edit-form" @submit=${onSubmit} id="ëdit">
        <fieldset>
            <legend>Edit my Pet</legend>
            <p class="field">
                <label for="name">Name</label>
                <span class="input">
                    <input type="text" name="name" id="name" .value=${pet.name}>
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description"
                        id="description">${pet.description}</textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" .value=${pet.imageUrl}>
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" .value=${pet.type}>
                        <option value="cat" >Cat</option>
                        <option value="dog" selected>Dog</option>
                        <option value="parrot">Parrot</option>
                        <option value="reptile">Reptile</option>
                        <option value="other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>
`;

export async function editPage(ctx) {
    const petId = ctx.params.id;
    const pet = await getPetById(petId);
    ctx.render(editTemplate(pet, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target); 

        const editedPet = {
            // @ts-ignore
            name: formData.get("name").trim(),
            // @ts-ignore
            description: formData.get("description").trim(),
            // @ts-ignore
            type: formData.get("type"),
             // @ts-ignore
            imageUrl: formData.get("imageUrl").trim(),
        };

        const petTypes = ["cat", "dog", "reptile", "parrot", "other"];

        if (Object.values(editedPet).some((x) => !x)) {
            return alert("All fields are required!");
        }


        await updatePet(petId, editedPet);
        event.target.reset();
        ctx.page.redirect("/details/" + petId);
    }
}
