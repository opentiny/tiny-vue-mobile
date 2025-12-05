<!--
 * Copyright (c) 2022 - present TinyVue Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 -->
<script lang="tsx">
import { setup, h, defineComponent } from '@mobile-root/common'
import { renderless, api } from './renderless/vue'
import Button from '../../button'
import { iconFullscreenLeft, iconMinscreenLeft } from '@opentiny/vue-icon'
import { modalProps } from './modal'
import '@opentiny/vue-theme-mobile/modal/index.less'

import {
  iconHelpSolid,
  iconSuccess,
  iconError,
  iconHelp,
  iconLoadingShadow,
  iconWarning,
  iconClose,
  iconFullscreenRight,
  iconMinscreenRight
} from '@opentiny/vue-icon'

export default defineComponent({
  props: modalProps,
  provide() {
    return { dialog: this }
  },
  setup(props, context) {
    return setup({ props, context, renderless, api })
  },
  render() {
    let { state, scopedSlots, vSize, type, resize, animat, showHeader,_constants: constants, status } = this
    let { showFooter, title, message, lockScroll, lockView, mask, t } = this
    let { confirmContent, cancelContent, confirmBtnProps, cancelBtnProps } = this
    let { zoomLocat, visible, contentVisible, modalTop, isMsg } = state
    let defaultSlot = scopedSlots.default
    let footerSlot = scopedSlots.footer
    const confirmButtonText = confirmContent ?? confirmBtnProps.text ?? t('ui.button.confirm')
    const cancelButtonText = cancelContent ?? cancelBtnProps.text ?? t('ui.button.cancel')

    const STATUS_MAPPING_COMPINENT = {
      QUESTION: iconHelpSolid(),
      INFO: iconHelp(),
      SUCCESS: iconSuccess(),
      WARNING: iconWarning(),
      ERROR: iconError(),
      LOADING: iconLoadingShadow()
    }

    return h(
      'div',
      {
        class: [
          'tiny-mobile-modal',
          'tiny-mobile-modal__wrapper',
          `type__${type}`,
          {
            [`size__${vSize}`]: vSize,
            [`status__${status}`]: typeof status === 'string',
            is__animat: animat,
            lock__scroll: lockScroll,
            lock__view: lockView,
            is__mask: mask,
            is__maximize: zoomLocat,
            is__visible: contentVisible,
            active: visible
          }
        ],
        style: {
          zIndex: this.state.modalZindex,
          top: modalTop ? `${modalTop}px` : null
        },
        on: {
          click: this.selfClickEvent
        }
      },
      [
        h(
          'div',
          {
            class: 'tiny-mobile-modal__box',
            ref: 'modalBox'
          },
          [
            showHeader
              ? h(
                  'div',
                  {
                    class: 'tiny-mobile-modal__header',
                    on: {
                      mousedown: this.mousedownEvent
                    }
                  },
                  [
                    status
                      ? h(
                          'div',
                          {
                            class: ['tiny-mobile-modal__status-wrapper']
                          },
                          [
                            typeof status === 'string'
                              ? h(STATUS_MAPPING_COMPINENT[status.toUpperCase()], {
                                  class: [constants.STATUS_MAPPING_CLASSS[status.toUpperCase()]]
                                })
                              : h(status, {
                                  class: ['tiny-modal__status-icon']
                                })
                          ]
                        )
                    : null,
                    h(
                      'span',
                      {
                        class: 'tiny-mobile-modal__title'
                      },
                      title || t('ui.alert.title')
                    ),
                    resize
                      ? h(zoomLocat ? iconMinscreenLeft() : iconFullscreenLeft(), {
                          class: ['tiny-mobile-modal__zoom-btn', 'trigger__btn'],
                          on: {
                            click: this.toggleZoomEvent
                          }
                        })
                      : null
                  ]
                )
              : null,
            h(
              'div',
              {
                class: ['tiny-mobile-modal__body', type === 'message' ? 'is-message' : '']
              },
              [
                type === 'message'
                  ? h(
                      'div',
                      {
                        class: 'tiny-mobile-modal__status-wrapper'
                      },
                      [
                        typeof status === 'string'
                        ? h(STATUS_MAPPING_COMPINENT[status.toUpperCase()], {
                            class: [constants.STATUS_MAPPING_CLASSS[status.toUpperCase()]]
                          })
                          : h(status, {
                            class: ['tiny-mobile-modal__status-icon']
                        })
                      ]
                    )
                  : null,
                h(
                  'div',
                  {
                    class: 'tiny-mobile-modal__content'
                  },
                  defaultSlot
                    ? defaultSlot.call(this, { $modal: this }, h)
                    : [
                        h(
                          'div',
                          { class: 'tiny-mobile-modal__text' },
                          typeof message === 'function' ? message.call(this, h) : message
                        )
                      ]
                )
              ]
            ),
            showFooter
              ? h(
                  'div',
                  {
                    class: 'tiny-mobile-modal__footer'
                  },
                  footerSlot
                    ? footerSlot.call(this, { $modal: this, beforeClose: this.beforeClose }, h)
                    : [
                        type === 'confirm'
                          ? h(
                              Button,
                              {
                                props: {
                                  type: 'secondary',
                                  size: 'small',
                                },
                                on: {
                                  click: this.cancelEvent
                                }
                              },
                              cancelButtonText
                            )
                          : null,
                        h(
                          Button,
                          {
                            props: {
                              type: 'primary',
                              size: 'small',
                              class: [type !== 'confirm' ? 'tiny-mobile-button__single' : '']
                            },
                            on: {
                              click: this.confirmEvent
                            }
                          },
                          confirmButtonText
                        )
                      ]
                )
              : null,
            !isMsg && resize
              ? h(
                  'span',
                  {
                    class: 'tiny-mobile-modal__resize'
                  },
                  ['wl', 'wr', 'swst', 'sest', 'st', 'swlb', 'selb', 'sb'].map((type) =>
                    h('span', {
                      class: `${type}-resize`,
                      attrs: { 'data-type': type },
                      on: { mousedown: this.dragEvent }
                    })
                  )
                )
              : null
          ]
        )
      ]
    )
  }
})
</script>
