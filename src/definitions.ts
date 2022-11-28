/*
 * Copyright (c) 2022-present New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0 
 */

export interface NewRelicCapacitorPluginPlugin {
  start(options: { appKey: string }): void;
  setUserId(options: { userId: string }): void;
  setAttribute(options:{name: string, value: string}): void;
  removeAttribute(options:{name: string}): void;
  recordBreadcrumb(options:{name: string, eventAttributes: object}): void;
  recordCustomEvent(options:{eventType: string, eventName: string, attributes: object}): void;
  startInteraction(options:{value: string}): Promise<{ value: string }>;
  endInteraction(options:{interactionId: string}): void;
  crashNow(options?: {message: string}): void;
  currentSessionId(options?: {}): Promise<{sessionId: string}>;
  incrementAttribute(options: {name: string, value?: number}): void;
  noticeHttpTransaction(options: {
    url: string, 
    method: string, 
    status: number, 
    startTime: number, 
    endTime: number, 
    bytesSent: number, 
    bytesReceived: number, 
    body: string
  }): void;
  noticeNetworkFailure(options: {
    url: string,
    method: string,
    status: number,
    startTime: number,
    endTime: number,
    failure: string
  }): void;
  recordMetric(options: {
    name: string,
    category: string,
    value?: number, 
    countUnit?: string,
    valueUnit?: string,
  }): void;
  removeAllAttributes(options?: {}): void;
  setMaxEventBufferTime(options: {maxBufferTimeInSeconds: number}): void;
  setMaxEventPoolSize(options: {maxPoolSize: number}): void;
  recordError(options: {
    name: string;
    message: string;
    stack: string;
    isFatal: boolean;
  }): void;
  analyticsEventEnabled(options: {enabled: boolean}): void;
  networkRequestEnabled(options: {enabled: boolean}): void;
  networkErrorRequestEnabled(options: {enabled: boolean}): void;
  httpRequestBodyCaptureEnabled(options: {enabled: boolean}): void;
}