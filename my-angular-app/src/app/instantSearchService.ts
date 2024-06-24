import { Injectable } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';
import InstantSearch from 'instantsearch.js/es/lib/InstantSearch';
import type { IndexWidget, Widget } from 'instantsearch.js';
import TypesenseInstantsearchAdapter from 'typesense-instantsearch-adapter';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const searchClient = algoliasearch(
  'YourApplicationID',
  'YourSearchOnlyAPIKey'
);

@Injectable({
  providedIn: 'root',
})
export class InstantSearchService {
    
  public instantSearchInstance: InstantSearch;
  public config: any;

  constructor(private http: HttpClient
  ) {

    const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
      server: {
        apiKey: "xyz", 
        nodes: [
          {
            host: "localhost",
            port: 8108,
            protocol: "http"
          }
        ]
      },
      additionalSearchParameters: {
        query_by: "name"
      }
    });

    const searchClient = typesenseInstantsearchAdapter.searchClient;

    const config = {
      indexName: "products",
      searchClient: searchClient,
    };

    this.instantSearchInstance = new InstantSearch(config);
  }

  start() {
    try {
      this.instantSearchInstance.start();
    }
    catch (e: any) {
      console.log(e);
    }
  }

  addWidgets(widgets: (IndexWidget | Widget)[]) {
    this.instantSearchInstance.addWidgets(widgets);
  }

  removeWidgets(widgets: (IndexWidget | Widget)[]) {
    this.instantSearchInstance.removeWidgets(widgets);
  }

  emptyWidgets() {
    this.instantSearchInstance.dispose();
  }

}