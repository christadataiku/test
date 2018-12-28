import dataiku
import pandas as pd

@app.route('/nodes_api_call')
def nodes_call():

    links = dataiku.Dataset("top_links").get_dataframe()
       
    return json.dumps({"links" : links.to_json(orient='records')})

