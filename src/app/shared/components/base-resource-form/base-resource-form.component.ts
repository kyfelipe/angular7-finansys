import { Component, OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Component({
    selector: 'app-resource-form'
})
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {
	public currentAction: string;
	public resourceForm: FormGroup;
	public pageTitle: string;
	public serverErrorMessages: string[] = null;
	public submittingForm: boolean = false;
    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;

	constructor(
        protected injector: Injector,
        public resource: T,
        protected resourceService: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonData) => T
	) { 
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.formBuilder = this.injector.get(FormBuilder);
    }

	ngOnInit() {
		this.setCurrentAction();
		this.buildResourceForm();
		this.loadResource();
	}

	ngAfterContentChecked() {
		this.setPageTitle();
	}

	public submitForm() {
		this.submittingForm = true;
		if (this.currentAction === 'new') {
			this.createResource();
		} else {
			this.updateResource();
		}
	}

	protected setCurrentAction() {
		if (this.route.snapshot.url[0].path === 'new') {
			this.currentAction = 'new';
		} else {
			this.currentAction = 'edit';
		}
	}

	protected loadResource() {
		if (this.currentAction === 'edit') {
			this.route.paramMap.pipe(
				switchMap(
					(params) => this.resourceService.getById(+params.get('id'))
					)
			).subscribe(
				(category) => {
					this.resource = category;
					this.resourceForm.patchValue(this.resource);
				},
				(error) => console.log('Error: ', error)
			);
		}
	}

	protected setPageTitle() {
		if (this.currentAction === 'new') {
			this.pageTitle = this.creationPageTitle();
		} else {
			this.pageTitle = this.editionPageTitle();
		}
	}

    protected creationPageTitle(): string {
        return 'Novo';
    }

    protected editionPageTitle(): string {
        return 'Edição';
    }

	protected createResource() {
		const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
		this.resourceService.create(resource).subscribe(
			(resource) => this.actionsForSuccess(resource),
			(error) => this.actionsForError(error)
		);
	}

	protected updateResource() {
		const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
		this.resourceService.update(resource).subscribe(
			(resource) => this.actionsForSuccess(resource),
			(error) => this.actionsForError(error)
		);;
	}

	protected actionsForSuccess(resource: T) {
		toastr.success('Solicitação processada com sucesso');

        const baseResourcePath: string = this.route.snapshot.parent.url[0].path;

		this.router.navigateByUrl(baseResourcePath, { skipLocationChange: true }).then(
			() => this.router.navigate([baseResourcePath, resource.id, 'edit'])
		);
	}

	protected actionsForError(error) {
		toastr.error('Ocorreu um error na solicitação!');

		this.submittingForm = false;

		if (error.status === 422) {
			this.serverErrorMessages = JSON.parse(error._body).errors;
		} else {
			this.serverErrorMessages = ['Falha na comunição com o servidor.'];
		}
    }
    
    protected abstract buildResourceForm(): void;
}
