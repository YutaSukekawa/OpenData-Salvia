<map>

    

	<script>
		mapboxgl.accessToken = 'pk.eyJ1IjoieXV0YXN1a2VrYXdhIiwiYSI6ImNqN3U4dm9zeDI5a3EzMm8zM3Zha3N0YXMifQ.7c2R5J9mZpJi2Y1dU5AENw'
		var map_style = 'mapbox://styles/mapbox/streets-v9'

        map = new mapboxgl.Map({
            container: 'map',
            style: map_style,
            center: [141.488399, 40.512284],
            zoom: 12,
            minZoom: 6,
            maxZoom: 17,
            pitch: 45,
            hash: true,
            attributionControl: true
        })
		map.addControl(new mapboxgl.NavigationControl())
	</script>

	<style>
		#map { position:absolute; top:0; bottom:0; width:100%; }
	</style>
</map>