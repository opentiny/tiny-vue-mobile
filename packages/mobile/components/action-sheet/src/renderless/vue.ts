/**
 * Copyright (c) 2022 - present TinyVue Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */

import type {
  IActionSheetApi,
  IActionSheetState,
  IActionSheetProps,
  ISharedRenderlessParamHooks,
  IActionSheetRenderlessParamUtils
} from '../action-sheet'

import {
  setSheetStyle,
  initScrollMenu,
  visibleHandle,
  watchVisible,
  menuHandle,
  close,
  selectOption,
  confirmFn,
  actionSelectOption,
  hide,
  cancelFn,
  handleClose
} from './index'

export const api = [
  'state',
  'setSheetStyle',
  'initScrollMenu',
  'visibleHandle',
  'watchVisible',
  'menuHandle',
  'close',
  'selectOption',
  'confirmFn',
  'actionSelectOption',
  'hide',
  'cancelFn',
]

export const renderless = (
  props: IActionSheetProps,
  { reactive, watch }: ISharedRenderlessParamHooks,
  { emit, nextTick, refs, vm }: IActionSheetRenderlessParamUtils,
  { BScroll }
): IActionSheetApi => {
  const state = reactive<IActionSheetState>({
    toggle: false,
    sheetMaskStyle: {},
    sheetContentStyle: {},
    scroll: null
  })

  const api: IActionSheetApi = {} as IActionSheetApi
  Object.assign(api, {
    state,
    setSheetStyle: setSheetStyle({ state, props }),
    initScrollMenu: initScrollMenu({ state, nextTick, refs, BScroll }),
    visibleHandle: visibleHandle({ emit, state }),
    watchVisible: watchVisible({ emit, state }),
    menuHandle: menuHandle({ state, emit }),
    confirmFn: confirmFn({ api }),
    selectOption: selectOption({ emit, props }),
    actionSelectOption: actionSelectOption({ emit }),
    hide: hide({ api }),
    close: close({ api }),
    cancelFn: cancelFn({ api }),
    handleClose: handleClose({ vm, emit, props })
  })

  watch(
    () => props.visible,
    (value) => {
      if (value) {
        api.setSheetStyle({ state, props })
        api.initScrollMenu({ state, nextTick, refs, BScroll })
      }
      api.watchVisible(value)
    }
  )

  watch(() => props.visible, api.watchVisible, { immediate: true })

  return api
}
