import folium
from folium.plugins import Draw
import streamlit as st
from streamlit_folium import st_folium
import googlemaps
from streamlit_option_menu import option_menu
from pprint import pprint
import os

api_key = os.environ["GOOGLE_API_KEY"]
print(api_key)
map_client = googlemaps.Client(key=api_key)
address = "Piata Unirii, Timisoara, RO"
response = map_client.geocode(address)
pprint(response)

Timisoara: 45.7536121,21.2084034
_map = folium.Map(location=[45.75601417988166, 21.2289848306682], zoom_start=13)
draw_options = {
    'polyline': False,
    'polygon': False,
    'rectangle': False,
    'circle': False,
    'circlemarker': False
}
edit_options = {
    'edit': False,
}
Draw(draw_options=draw_options, edit_options=edit_options).add_to(_map)
st.title("CloudBees' CityDangerApp 🐝")

with st.sidebar:
    menu_item = option_menu("Main Menu", ["Home", 'Settings'],
                            icons=['house', 'gear'], menu_icon="cast", default_index=0)

with st.sidebar:
    st.markdown("---")
    st.text("User: Balssh")
    st.text("Version: 0.0.1")
    st.button("Logout")
    st.markdown("---")

if menu_item == "Home":
    output = st_folium(_map, width=750, height=500)
    st.write(output)

