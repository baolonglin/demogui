
(setq package-archives '(("gnu" . "http://elpa.gnu.org/packages/")
                         ("marmalade" . "https://marmalade-repo.org/packages/")
                         ("melpa" . "http://melpa.org/packages/")))
(package-initialize)

(unless package-archive-contents
  (package-refresh-contents))

(setq package-list '(
		     js2-mode
		     yasnippet
		     auto-complete
		     react-snippets
		     flycheck
		     web-mode
             web-beautify
             helm
             helm-projectile
             projectile
		     ))

(dolist (package package-list)
  (unless (package-installed-p package)
    (package-install package)))

;; js configuration
(add-to-list 'auto-mode-alist '("\\.json$" . js-mode))
(add-hook 'js-mode-hook 'js2-minor-mode)
(add-hook 'js2-mode-hook 'ac-js2-mode)

(setq js2-highlight-level 3)

;;(define-key js-mode-map "{" 'paredit-open-curly)
;;(define-key js-mode-map "}" 'paredit-close-curly-and-newline)

;; yasnippet
(require 'yasnippet)
(yas-global-mode 1)

;; react snippets
(require 'react-snippets)

;; auto complete mode
(require 'auto-complete-config)
(add-to-list 'ac-dictionary-directories "~/.emacs.d/ac-dict")
(ac-config-default)
(ac-set-trigger-key "TAB")
(ac-set-trigger-key "<tab>")

;; jshint with flycheck
(require 'flycheck)
(add-hook 'js-mode-hook
	  (lambda () (flycheck-mode t)))

;; jsx with web-mode
(add-to-list 'auto-mode-alist '("\\.jsx$" . web-mode))
(defadvice web-mode-highlight-part (around tweak-jsx activate)
  (if (equal web-mode-content-type "jsx")
      (let ((web-mode-enable-part-face nil))
	ad-do-it)
    add-to-it))

(flycheck-define-checker jsxhint-checker
  " A JSX syntax and style checker based on ESLint."
  
  :command ("jsxhint" source)
  :error-patterns ((error line-start (1+ nonl) ": line " line ", col " column ", " (message) line-end))
  :modes (web-mode))
(add-hook 'web-mode-hook
	  (lambda ()
	    (when (equal web-mode-content-type "jsx")
	      (flycheck-select-checker 'jshint-checker)
	      (flycheck-mode))))

(setq jsx-indent-level 2)
(add-hook 'jsx-mode-hook
	  (lambda () (auto-complete-mode 1)))

;; this variables must be set before load helm-gtags
;; you can change to any prefix key of your choice
(setq helm-gtags-prefix-key "\C-cg")

;; Package: projejctile
(require 'projectile)
(projectile-global-mode)
(setq projectile-enable-caching t)

(require 'helm-projectile)
(helm-projectile-on)
(setq projectile-completion-system 'helm)
(setq projectile-indexing-method 'alien)

;; Theme
(load-theme 'monokai t)

(when (member "DejaVu Sans Mono" (font-family-list))
  (set-face-attribute 'default nil :font "DejaVu Sans Mono"))
