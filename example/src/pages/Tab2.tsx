/*
 * Copyright (c) 2022-present New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0 
 */

import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { NewRelicCapacitorPlugin } from "@newrelic/newrelic-capacitor-plugin";
import ErrorBoundary from "../ErrorBoundary";
import "./Tab2.css";
import axios from 'axios';

const Tab2: React.FC = () => {

  const badApiLoad = async () => {

    axios.get('https://api.github.com/users/mapbo')
  .then((response) => {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });

    const id = await NewRelicCapacitorPlugin.startInteraction({ value: 'StartLoadBadApiCall'});
    console.log(id);
    const url = 'https://fakewebsite.com/moviessssssssss.json';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      NewRelicCapacitorPlugin.endInteraction({interactionId: id.value})
    }) .catch((error) => {
      NewRelicCapacitorPlugin.endInteraction({ interactionId: id.value });
      console.error(error);
    });
  }

  const goodApiLoad = async () => {
    const id = await NewRelicCapacitorPlugin.startInteraction({ value: 'StartLoadGoodApiCall'});
    console.log(id);
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      NewRelicCapacitorPlugin.endInteraction({interactionId: id.value})
    }) .catch((error) => {
      NewRelicCapacitorPlugin.endInteraction({ interactionId: id.value });
      console.error(error);
    });
  }

  // Should be caught by ErrorBoundary component where we record error
  const errorHandler = () => {
    try {
    throw new Error("example error message");
    } catch(e ) {
    if (typeof e === "string") {
        e.toUpperCase() // works, `e` narrowed to string
    } else if (e instanceof Error) {
        NewRelicCapacitorPlugin.recordError({
          name: e.name,
          message: e.message,
          stack: e.stack ? e.stack : "",
          isFatal: false,
          attributes : {"error": "From Attributes"}
        });
      }
    }

  }

  const consoleHandler = () => {
    console.log('this is an example console log');
    console.warn('this is an example console warn');
    console.error('this is an example console error');
  }

  return (
    <ErrorBoundary>
      <IonContent>
        <IonList>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Interactions</IonCardTitle>
            </IonCardHeader>
            <IonButton onClick={badApiLoad}>Bad API Load</IonButton>
            <IonButton onClick={goodApiLoad}>Good API Load</IonButton>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Errors</IonCardTitle>
            </IonCardHeader>
            <IonButton onClick={errorHandler}>Throw uncaught error</IonButton>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Console events</IonCardTitle>
            </IonCardHeader>
            <IonButton onClick={consoleHandler}>Create console events</IonButton>
          </IonCard>
        </IonList>
      </IonContent>
    </ErrorBoundary>
  );
};

export default Tab2;
