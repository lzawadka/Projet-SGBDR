<head>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<script>
	import {apiData, movies, maxPage} from './store'

	let orderByType = 'film.title'
	let orderBy = 'asc'
	let limit = 10
	let page = 1

	$: {
		if (page > $maxPage) 
			page = $maxPage
	}

	$: {
		if (page && limit) {
			fetch(`https://sgbdr-api.herokuapp.com/movies?orderByType=${orderByType}&orderBy=${orderBy}&limit=${limit}&page=${page}`)
				.then(response => response.json())
				.then(data => apiData.set(data))
		}
	}
</script>

<main>
	<h1>Liste de films</h1>
	<div class="inputs d-flex flex-column">
		<div class="input">
			<label for="limit">Resultats :</label>
			<input id="limit" type="number" bind:value={limit} min={1} max={100}>
		</div>
		<div class="input">
			<label for="filter">Filtrer par :</label>
			<select name="filter" bind:value={orderByType}>
				<option value="film.title">Title</option>
				<option value="category.name">Category</option>
				<option value="rental_number">Number of rentals</option>
			</select>
		</div>
		<div class="input">
			<label for="order">Ordonner par :</label>
			<select name="order" bind:value={orderBy}>
				<option value="desc">Desc</option>
				<option value="asc">Asc</option>
			</select>
		</div>
	</div>
	<h2>Films</h2>
		<div class="d-flex flex-column w-100">
			{#each $movies as movie}
				<div class="card mb-2 col" style="width: 18rem;">
					<div class="card-body">
						<h1 class="card-title">
							{movie.title}
						</h1>
						<h6 class="card-subtitle mb-2 text-muted">{movie.category}</h6>
						<p class="card-text">{movie.rental_rate}€</p>
						<p class="card-text">{movie.rental_number} rentals</p>
						<p class="card-text">{movie.rating}</p>
					</div>
				</div>
			{/each}
		</div>
	<button on:click={() => page--} disabled={page <= 1}>Previous page</button>
	<input type="number" bind:value={page} min="1" max={$maxPage}>
	<button on:click={() => page++} disabled={page >= $maxPage}>Next page</button>
</main>

<style>
	.inputs {
		display: flex;
		flex-direction: row;
	}
	.input {
		display: flex;
		flex-direction: column;
	}
</style>